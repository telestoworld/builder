import { env, envTLD } from 'tw-ops-lib/domain'
import { buildStatic } from 'tw-ops-lib/buildStatic'

async function main() {
  const builder = buildStatic({
    domain: `builder.telestoworld.${env === 'prd' ? 'org' : envTLD}`,
    defaultPath: 'index.html',
  })

  return {
    cloudfrontDistribution: builder.cloudfrontDistribution,
    bucketName: builder.contentBucket,
  }
}
export = main
