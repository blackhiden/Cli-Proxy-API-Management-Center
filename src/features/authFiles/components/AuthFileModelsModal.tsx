import { useTranslation } from 'react-i18next';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import { EmptyState } from '@/components/ui/EmptyState';
import type { AuthFileModelItem } from '@/features/authFiles/constants';
import { isModelExcluded } from '@/features/authFiles/constants';
import type { ModelVerification } from '@/features/authFiles/hooks/useAuthFilesModels';
import styles from './AuthFileModelsModal.module.scss';

export type AuthFileModelsModalProps = {
  open: boolean;
  fileName: string;
  fileType: string;
  loading: boolean;
  error: 'unsupported' | null;
  models: AuthFileModelItem[];
  excluded: Record<string, string[]>;
  verifications: Record<string, ModelVerification>;
  onClose: () => void;
  onCopyText: (text: string) => void;
  onVerifyModel: (model: string) => void;
};

export function AuthFileModelsModal(props: AuthFileModelsModalProps) {
  const { t } = useTranslation();
  const {
    open,
    fileName,
    fileType,
    loading,
    error,
    models,
    excluded,
    verifications,
    onClose,
    onCopyText,
    onVerifyModel,
  } = props;

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={t('auth_files.models_title', { defaultValue: '支持的模型' }) + ` - ${fileName}`}
      footer={
        <Button variant="secondary" onClick={onClose}>
          {t('common.close')}
        </Button>
      }
    >
      {loading ? (
        <div className="hint">
          {t('auth_files.models_loading', { defaultValue: '正在加载模型列表...' })}
        </div>
      ) : error === 'unsupported' ? (
        <EmptyState
          title={t('auth_files.models_unsupported', { defaultValue: '当前版本不支持此功能' })}
          description={t('auth_files.models_unsupported_desc', {
            defaultValue: '请更新 CLI Proxy API 到最新版本后重试',
          })}
        />
      ) : models.length === 0 ? (
        <EmptyState
          title={t('auth_files.models_empty', { defaultValue: '该凭证暂无可用模型' })}
          description={t('auth_files.models_empty_desc', {
            defaultValue: '该认证凭证可能尚未被服务器加载或没有绑定任何模型',
          })}
        />
      ) : (
        <div className={styles.list}>
          {models.map((model) => {
            const excludedModel = isModelExcluded(model.id, fileType, excluded);
            const verification = verifications[model.id];
            return (
              <div
                key={model.id}
                className={`${styles.item} ${excludedModel ? styles.itemExcluded : ''}`}
                onClick={() => {
                  onCopyText(model.id);
                }}
                title={
                  excludedModel
                    ? t('auth_files.models_excluded_hint', {
                        defaultValue: '此 OAuth 模型已被禁用',
                      })
                    : t('common.copy', { defaultValue: '点击复制' })
                }
              >
                <div className={styles.modelDetails}>
                  <span className={styles.modelId}>{model.id}</span>
                  {model.display_name && model.display_name !== model.id && (
                    <span className={styles.modelDisplayName}>{model.display_name}</span>
                  )}
                  {model.type && <span className={styles.modelType}>{model.type}</span>}
                  {excludedModel && (
                    <span className={styles.excludedBadge}>
                      {t('auth_files.models_excluded_badge', { defaultValue: '已禁用' })}
                    </span>
                  )}
                  {verification?.status === 'failed' && verification.error && (
                    <span className={styles.failureReason} role="status">
                      {verification.error}
                    </span>
                  )}
                </div>
                <div className={styles.modelActions}>
                  {verification?.status === 'success' && (
                    <span
                      className={`${styles.verificationBadge} ${styles.successBadge}`}
                      role="status"
                    >
                      {t('auth_files.model_test_success')}
                    </span>
                  )}
                  {verification?.status === 'failed' && (
                    <span
                      className={`${styles.verificationBadge} ${styles.failureBadge}`}
                      role="status"
                    >
                      {t('auth_files.model_test_failed')}
                    </span>
                  )}
                  <Button
                    variant="secondary"
                    size="sm"
                    loading={verification?.status === 'pending'}
                    disabled={verification?.status === 'pending'}
                    aria-label={t('auth_files.model_test_action_label', { model: model.id })}
                    onClick={(event) => {
                      event.stopPropagation();
                      onVerifyModel(model.id);
                    }}
                  >
                    {t('auth_files.model_test_action')}
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </Modal>
  );
}
