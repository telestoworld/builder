import { Experiments, Experiment, Variant } from 'telestoworld-experiments'
import { ADD_ITEM } from 'modules/scene/actions'

export const EXPERIMENT_TUTORIAL_OPEN = 'experiment-tutorial-open'

export default new Experiments({
  [EXPERIMENT_TUTORIAL_OPEN]: new Experiment({
    name: 'tutorial_show_vs_hide',
    variants: [
      new Variant('tutorial_show', .5, true),
      new Variant('tutorial_hide', .5, false)
    ],
    track(event, experiment) {
      if (event.type === 'track' && event.name === ADD_ITEM) {
        experiment.complete()
      }
    }
  })
})
