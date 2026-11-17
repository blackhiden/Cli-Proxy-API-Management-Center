import { useCallback, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { apiClient, authFilesApi } from '@/services/api';
import { useNotificationStore } from '@/stores';
import type { AuthFileItem } from '@/types';
import type { AuthFileModelItem } from '@/features/authFiles/constants';

type ModelsError = 'unsupported' | null;
export type ModelVerification = { status: 'pending' | 'success' | 'failed'; error?: string };

export type UseAuthFilesModelsResult = {
  modelsModalOpen: boolean;
  modelsLoading: boolean;
  modelsList: AuthFileModelItem[];
  modelsFileName: string;
  modelsFileType: string;
  modelsError: ModelsError;
  modelVerifications: Record<string, ModelVerification>;
  showModels: (item: AuthFileItem) => Promise<void>;
  verifyModel: (model: string) => Promise<void>;
  closeModelsModal: () => void;
  /** 文件集变更后失效缓存；不传 names 则全部清空。 */
  invalidateModels: (names?: string[]) => void;
};

export function useAuthFilesModels(): UseAuthFilesModelsResult {
  const { t } = useTranslation();
  const showNotification = useNotificationStore((state) => state.showNotification);

  const [modelsModalOpen, setModelsModalOpen] = useState(false);
  const [modelsLoading, setModelsLoading] = useState(false);
  const [modelsList, setModelsList] = useState<AuthFileModelItem[]>([]);
  const [modelsFileName, setModelsFileName] = useState('');
  const [modelsFileType, setModelsFileType] = useState('');
  const [modelsError, setModelsError] = useState<ModelsError>(null);
  const [modelVerifications, setModelVerifications] = useState<Record<string, ModelVerification>>({});
  const modelsCacheRef = useRef<Map<string, AuthFileModelItem[]>>(new Map());
  const modelsCacheVersionRef = useRef(0);
  const modelsConnectionRef = useRef(apiClient.getConnectionRevision());
  const modelsFileVersionRef = useRef<Map<string, number>>(new Map());
  const activeModelsRequestIdRef = useRef(0);
  const verificationSessionRef = useRef(0);
  const activeVerificationRef = useRef<Set<string>>(new Set());

  const closeModelsModal = useCallback(() => {
    activeModelsRequestIdRef.current += 1;
    verificationSessionRef.current += 1;
    activeVerificationRef.current.clear();
    setModelVerifications({});
    setModelsModalOpen(false);
    setModelsLoading(false);
  }, []);

  const invalidateModels = useCallback((names?: string[]) => {
    if (!names) {
      modelsCacheRef.current.clear();
      modelsFileVersionRef.current.clear();
      modelsCacheVersionRef.current += 1;
      return;
    }
    new Set(names.map((name) => name.trim()).filter(Boolean)).forEach((name) => {
      modelsCacheRef.current.delete(name);
      modelsFileVersionRef.current.set(name, (modelsFileVersionRef.current.get(name) ?? 0) + 1);
    });
  }, []);

  const showModels = useCallback(
    async (item: AuthFileItem) => {
      const revision = apiClient.getConnectionRevision();
      if (modelsConnectionRef.current !== revision) {
        invalidateModels();
        modelsConnectionRef.current = revision;
      }
      const cacheKey = item.name.trim();
      const requestId = ++activeModelsRequestIdRef.current;
      verificationSessionRef.current += 1;
      activeVerificationRef.current.clear();
      setModelVerifications({});

      setModelsFileName(item.name);
      setModelsFileType(item.type || '');
      setModelsList([]);
      setModelsError(null);
      setModelsModalOpen(true);

      const cached = modelsCacheRef.current.get(cacheKey);
      if (cached) {
        setModelsList(cached);
        setModelsLoading(false);
        return;
      }

      const cacheVersion = modelsCacheVersionRef.current;
      const fileVersion = modelsFileVersionRef.current.get(cacheKey) ?? 0;
      const isCacheCurrent = () =>
        revision === apiClient.getConnectionRevision() &&
        cacheVersion === modelsCacheVersionRef.current &&
        fileVersion === (modelsFileVersionRef.current.get(cacheKey) ?? 0);
      const isRequestCurrent = () => requestId === activeModelsRequestIdRef.current;

      setModelsLoading(true);
      try {
        const models = await authFilesApi.getModelsForAuthFile(item.name);
        if (isCacheCurrent()) {
          modelsCacheRef.current.set(cacheKey, models);
          if (isRequestCurrent()) setModelsList(models);
        }
      } catch (err) {
        if (!isRequestCurrent() || !isCacheCurrent()) return;
        const errorMessage = err instanceof Error ? err.message : '';
        if (
          errorMessage.includes('404') ||
          errorMessage.includes('not found') ||
          errorMessage.includes('Not Found')
        ) {
          setModelsError('unsupported');
        } else {
          showNotification(`${t('notification.load_failed')}: ${errorMessage}`, 'error');
        }
      } finally {
        if (isRequestCurrent()) setModelsLoading(false);
      }
    },
    [invalidateModels, showNotification, t]
  );

  const verifyModel = useCallback(async (model: string) => {
    const fileName = modelsFileName;
    const session = verificationSessionRef.current;
    const connectionRevision = apiClient.getConnectionRevision();
    const activeKey = `${session}:${model}`;
    if (!fileName || activeVerificationRef.current.has(activeKey)) return;

    activeVerificationRef.current.add(activeKey);
    setModelVerifications((current) => ({ ...current, [model]: { status: 'pending' } }));

    try {
      const result = await authFilesApi.verifyModel(fileName, model);
      if (
        session !== verificationSessionRef.current ||
        connectionRevision !== apiClient.getConnectionRevision()
      ) {
        return;
      }
      setModelVerifications((current) => ({
        ...current,
        [model]: result.verified
          ? { status: 'success' }
          : { status: 'failed', error: result.error || t('auth_files.model_test_failed') },
      }));
    } catch (err) {
      if (
        session !== verificationSessionRef.current ||
        connectionRevision !== apiClient.getConnectionRevision()
      ) {
        return;
      }
      const message = err instanceof Error ? err.message.trim() : '';
      setModelVerifications((current) => ({
        ...current,
        [model]: {
          status: 'failed',
          error: (message || t('auth_files.model_test_failed')).slice(0, 500),
        },
      }));
    } finally {
      activeVerificationRef.current.delete(activeKey);
    }
  }, [modelsFileName, t]);

  return {
    modelsModalOpen,
    modelsLoading,
    modelsList,
    modelsFileName,
    modelsFileType,
    modelsError,
    modelVerifications,
    showModels,
    verifyModel,
    closeModelsModal,
    invalidateModels,
  };
}
