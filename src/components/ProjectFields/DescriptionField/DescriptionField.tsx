import * as React from 'react'
import { Field, FieldProps } from 'telestoworld-ui'
import { t } from 'telestoworld-dapps/dist/modules/translation/utils'

import { MIN_DESCRIPTION_LENGTH, MAX_DESCRIPTION_LENGTH } from 'modules/project/utils'

export default class DescriptionField extends React.PureComponent<FieldProps> {
  render() {
    return (
      <Field
        icon={this.props.required ? 'asterisk' : undefined}
        label={`${t('project_fields.description_field_label')} (${t('global.optional')})`}
        placeholder={t('project_fields.description_field_placeholder')}
        pattern={`.{${MIN_DESCRIPTION_LENGTH},${MAX_DESCRIPTION_LENGTH}}`}
        title={t('validation.project.description.length', {
          min: MIN_DESCRIPTION_LENGTH,
          max: MAX_DESCRIPTION_LENGTH
        })}
        {...this.props}
      />
    )
  }
}
