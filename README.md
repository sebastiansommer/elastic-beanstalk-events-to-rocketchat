# elastic-beanstalk-events-to-rocketchat

[AWS Elastic Beanstalk](https://aws.amazon.com/elasticbeanstalk/) events to
[RocketChat](https://rocket.chat/) streaming function for
[AWS Lambda](https://aws.amazon.com/lambda/).

## Setup

### Function configuration

Add the function code to AWS Lambda with the following configuration options:

| Key     | Value                       |
| ------- | --------------------------- |
| Runtime | Node.js 12.x                |
| Handler | index.handler               |
| Role    | AWSLambdaBasicExecutionRole |
| Memory  | 128 (MB)                    |
| Timeout | 3 sec                       |
| KMS key | aws/lambda                  |

### Environment variables

Set the following required environment variable for the Lambda function:

| Key     | Value                                                               |
| ------- | ------------------------------------------------------------------- |
| rocketChatWebhookUrl | Your Rocket Chat Webhook URL |

### Trigger configuration

Create an [Amazon SNS](https://aws.amazon.com/sns/) topic and add it as SNS
trigger for the Lambda function.

Add the `Topic ARN` as Notification setting to your Elastic Beanstalk
[Environment Manifest (env.yaml)](https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/environment-cfg-manifest.html):

```yml
OptionSettings:
  aws:elasticbeanstalk:sns:topics:
    # Send deployment and health notifications to this Amazon SNS topic:
    NotificationTopicARN: arn:aws:sns:eu-west-1:000000000000:eb-deployments
```

## License

Released under the [MIT license](https://opensource.org/licenses/MIT).