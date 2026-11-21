import { useTranslation } from 'react-i18next';
import { CONFIG_TAB_ICONS, SECTION_INDEX_LABELS } from '../../constants';
import type { ConfigSectionProps } from '../../types';
import { SectionCard } from '../SectionCard';
import { SettingList, TextSetting } from '../fields/FieldPrimitives';
import { getValidationMessage } from '../blocks/shared';

const Icon = CONFIG_TAB_ICONS.streaming;

/** 04 流式传输：keepalive 与 bootstrap 重试；nonstream-keepalive-interval 是顶层 YAML 键。 */
export function SectionStreaming({
  values,
  validationErrors,
  disabled,
  animateIn,
  onChange,
}: ConfigSectionProps) {
  const { t } = useTranslation();
  const { streaming } = values;
  const keepaliveError = getValidationMessage(t, validationErrors?.['streaming.keepaliveSeconds']);
  const nonstreamKeepaliveError = getValidationMessage(
    t,
    validationErrors?.['streaming.nonstreamKeepaliveInterval']
  );
  // 0 / 空即关闭：输入框内右侧标「已禁用」，校验出错时让位给错误信息。
  const disabledBadge = t('config_management.visual.sections.streaming.disabled');
  const isKeepaliveOff = !keepaliveError && Number(streaming.keepaliveSeconds) <= 0;
  const isNonstreamKeepaliveOff =
    !nonstreamKeepaliveError && Number(streaming.nonstreamKeepaliveInterval) <= 0;

  return (
    <SectionCard
      indexLabel={SECTION_INDEX_LABELS.streaming}
      icon={<Icon size={16} />}
      title={t('config_management.visual.sections.streaming.title')}
      animateIn={animateIn}
    >
      <SettingList>
        <TextSetting
          fieldId="streamingKeepaliveSeconds"
          size="sm"
          label={t('config_management.visual.sections.streaming.keepalive_seconds')}
          type="number"
          placeholder="0"
          value={streaming.keepaliveSeconds}
          onChange={(keepaliveSeconds) =>
            onChange({ streaming: { ...streaming, keepaliveSeconds } })
          }
          disabled={disabled}
          error={keepaliveError}
          adornment={isKeepaliveOff ? disabledBadge : undefined}
        />
        <TextSetting
          fieldId="streamingBootstrapRetries"
          size="sm"
          label={t('config_management.visual.sections.streaming.bootstrap_retries')}
          description={t('config_management.visual.sections.streaming.bootstrap_hint')}
          type="number"
          placeholder="1"
          value={streaming.bootstrapRetries}
          onChange={(bootstrapRetries) =>
            onChange({ streaming: { ...streaming, bootstrapRetries } })
          }
          disabled={disabled}
          error={getValidationMessage(t, validationErrors?.['streaming.bootstrapRetries'])}
        />
      </SettingList>

      <SettingList>
        <TextSetting
          fieldId="streamingNonstreamKeepalive"
          size="sm"
          label={t('config_management.visual.sections.streaming.nonstream_keepalive')}
          description={t('config_management.visual.sections.streaming.nonstream_keepalive_hint')}
          type="number"
          placeholder="0"
          value={streaming.nonstreamKeepaliveInterval}
          onChange={(nonstreamKeepaliveInterval) =>
            onChange({ streaming: { ...streaming, nonstreamKeepaliveInterval } })
          }
          disabled={disabled}
          error={nonstreamKeepaliveError}
          adornment={isNonstreamKeepaliveOff ? disabledBadge : undefined}
        />
      </SettingList>

      <SettingList>
        <TextSetting
          fieldId="requestTimeout"
          size="sm"
          label={t('config_management.visual.sections.streaming.request_timeout')}
          description={t('config_management.visual.sections.streaming.request_timeout_hint')}
          placeholder="0"
          value={values.requestTimeout}
          onChange={(requestTimeout) => onChange({ requestTimeout })}
          disabled={disabled}
          error={getValidationMessage(t, validationErrors?.requestTimeout)}
        />
        <TextSetting
          fieldId="hardRequestDeadline"
          size="sm"
          label={t('config_management.visual.sections.streaming.hard_request_deadline')}
          description={t('config_management.visual.sections.streaming.hard_request_deadline_hint')}
          placeholder="0"
          value={values.hardRequestDeadline}
          onChange={(hardRequestDeadline) => onChange({ hardRequestDeadline })}
          disabled={disabled}
          error={getValidationMessage(t, validationErrors?.hardRequestDeadline)}
        />
        <TextSetting
          fieldId="providerRequestTimeouts"
          size="sm"
          label={t('config_management.visual.sections.streaming.provider_request_timeouts')}
          description={t(
            'config_management.visual.sections.streaming.provider_request_timeouts_hint'
          )}
          placeholder='{"codex":"10m"}'
          value={values.providerRequestTimeouts}
          onChange={(providerRequestTimeouts) => onChange({ providerRequestTimeouts })}
          disabled={disabled}
          error={getValidationMessage(t, validationErrors?.providerRequestTimeouts)}
        />
      </SettingList>
    </SectionCard>
  );
}
