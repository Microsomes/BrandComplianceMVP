const { Stack, Duration } = require('aws-cdk-lib');
// const sqs = require('aws-cdk-lib/aws-sqs');

const cdk = require('aws-cdk-lib');


class ScrapeJobsStack extends Stack {
  /**
   *
   * @param {Construct} scope
   * @param {string} id
   * @param {StackProps=} props
   */
  constructor(scope, id, props) {
    super(scope, id, props);

  
    const carphoneWarehouseScrapeImage = new cdk.aws_ecr_assets.DockerImageAsset(this, 'CarphoneWarehouseScrapeImage', {
      directory: '../scrapeJobs/scrapes/carphone',
      file: 'Dockerfile',
      platform: cdk.aws_ecr_assets.Platform.LINUX_AMD64
    });

    const taskRole = new cdk.aws_iam.Role(this, 'ScrapeJobsTaskRole', {
      assumedBy: new cdk.aws_iam.ServicePrincipal('ecs-tasks.amazonaws.com'),
    });

    //allow s3 read and write
    taskRole.addToPolicy(new cdk.aws_iam.PolicyStatement({
      actions: ['s3:*'],
      resources: ['*'],
    }));
    

    const taskDefinition = new cdk.aws_ecs.FargateTaskDefinition(this, 'ScrapeJobsTaskDefinition', {
      memoryLimitMiB: 512,
      cpu: 256,
      taskRole: taskRole
    });

    const scrapeJobsContainer = taskDefinition.addContainer('ScrapeJobsContainer', {
      image: cdk.aws_ecs.ContainerImage.fromDockerImageAsset(carphoneWarehouseScrapeImage),
      logging: cdk.aws_ecs.LogDrivers.awsLogs({ streamPrefix: 'ScrapeJobs' }),
    });

    //output task def arn
    new cdk.CfnOutput(this, 'ScrapeJobsTaskDefinitionArn', {
      value: taskDefinition.taskDefinitionArn,
    });

  }
}

module.exports = { ScrapeJobsStack }
