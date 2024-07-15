import Redis from 'ioredis';

const redis = new Redis({
    port: 19991,
    host: 'redis-19991.c294.ap-northeast-1-2.ec2.redns.redis-cloud.com',
    password: '6s8Exn4VWzvTZCwKmDakCvX5blmVVAst',
});

export default redis;