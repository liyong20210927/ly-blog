---
lang: zh-CN
title: Redis
description: Redis
---

# Redis（全文摘自黑马程序员Redis教程）

## 1、SQL和NOSQL

|          |                             SQL                              |                            NOSQL                             |
| :------: | :----------------------------------------------------------: | :----------------------------------------------------------: |
| 数据结构 |                     结构化（Structured）                     |                           非结构化                           |
| 数据关联 |                     关联的（Relational）                     |                           无关联的                           |
| 查询方式 |                           SQL查询                            |                            非SQL                             |
| 事务特性 |                             ACID                             |                             BASE                             |
| 存储方式 |                             磁盘                             |                        内存（性能高）                        |
|  扩展性  | 垂直（存储数据到关系型数据库，主从提升<br />依赖服务器性能，使用第三方插件，影响性能） | 水平（在插入数据时，根据唯一标识进行<br />哈希计算，找到存储节点） |
| 使用场景 | 1、数据结构固定 <br />2、相关业务对数据安全性、一致性要求较高 | 1、数据结构不稳定<br />2、对一致性、安全性要求不高<br/>3、对性能要求高 |

## 2、特征

* 键值型（key-value）数据库,value支持多种不同数据结构，功能丰富
* 单线程，每个命令具备原子性
* 低延迟，速度快（基于内存、IO多路复用、良好的编码C语言）
* 支持数据持久化
* 支持主从集群、分片集群
* 支持多语言客户端

## 3、安装

1.  yum install -y gcc tcl

2. 上传redis安装包至/usr/local/src目录

3. tar -zxvf redis

4. cd /redis

5. make && make install  默认安装路径在/usr/local/bin目录下

6. redis-cli redis提供命令行客户端  redis-server:redis服务端启动脚本 redis-sentinel:是redis的哨兵启动脚本

7. cp redis.conf redis.conf.bak 备份配置文件

   - 修改配置文件：bind 127.0.0.1 只允许本地访问  -》 bind 0.0.0.0 允许任意IP访问 生产环境不要设置0.0.0.0

   - 守护进程改成yes即可后台运行 deamonize yes

   - 密码 ：requirepass 123321 设置后，访问redis必须输入密码

   - 监听端口 port 6379

   - 工作目录，默认是当前目录，也就是运行redis-server时的命令，日志-持久化等文件会保存在这个目录  dir .

   - 数据库数量， databases  15

   - 设置redis能够使用的最大 内存 maxmemory 512mb

   - 日志文件，默认为空，不记录日志，可以指定文件名 logfile “redis.log”

8. 配置文件启动redis ，在redis目录下启动 redis-server redis.conf

9. redis系统自启

   - vi /etc/systemd/system/redis.service

   - ````text
     [Unit]
     Description=redis-server
     After=network.target
     
     [Service]
     Type=forking
     ExecStart=/usr/local/bin/redis-server /usr/local/src/redis-6.2.6/redis.conf
     PrivateTmp=true
     
     [Install]
     WantedBy=multi-user.target
     ````

   - 重载系统服务systemctl daemon-reload


## 4、Redis客户端

### 4.1 Redis命令行客户端 Redis-cli

redis-cli [options] [commonds]

其中常见的options有：

- -h 127.0.0.1 :指定要连接的redis地址，默认是127.0.0.1
- -p 6379: 指定要连接的redis节点的端口，默认6379
- -a 123321 制定redis的访问密码

commonds是redis的操作命令，例如：

- ping： 与redis服务端做心跳测试，服务端正常会返回pong

不指定commonds时，会进入redis-cli交互控制台

### 4.2 Redis图形化客户端 RDM

## 5、Redis数据结构

Redis是一个key-value的数据库，key一般是String类型的，不过value的类型多种多样

![image-20230628225442566](/images/中间件/redis/image-20230628225442566.png)

## 6、Redis常用命令

### 6.1 help @generic/string/set 查看通用命令

### 6.2 Redis通用命令

- keys：查看符合模板的所有key，不建议在生产环境使用
- DEL：删除指定的key（后可以跟多个key）
- EXISTS：查看一个key是否存在
- EXPIRE：给key设置一个有效期，有效期到期时间该KEY到期会被自动删除（秒）
- TTL：查看一个key剩余的有效期（-1表示永久有效，-2表示该key已被删除）

### 6.3 String类型

String类型，也就是字符串类型，是Redis中最贱的存储类型。其value是字符串，不过根据字符串的不同，又可以分为三类“

- String：普通字符串
- int：整型类型，可以做自增、自减操作
- float：浮点类型，可以做自增、自减操作

不论那种类型，底层都是字节数组形式存在，只不过编码格式不同，字符串类型最大空间不能超过512M。

**常见命令**

- set：添加或者修改已经存在的一个String类型的键值对

- get：根据key获取String类型的value

- mset：批量添加多个String类型的键值对

- mget：根据多个key获取多个String类型的value

- incr： 让一个整型的key自增1

- incrby： 让一个整型的key自增并指定步长。例如：lncrby num 2 让num值自增2

- incrbyfloat：让一个浮点类型的数字自增并指定步长

- setnx：添加一个String类型的键值对，前提是这个key不存在，否则不执行
- setex：添加一个String类型的键值对，并且指定有效期

### 6.4 key的结构

Redis的key允许有多个单词形成层级结构，多个单词之间用：隔开

````text
Key基本格式：    项目名：业务名：类型：id
````

格式并非固定，可根据自己需求添加或删除词条

### 6.4 Hash类型

Hash类型，也叫散列，其value是一个无需字典，类似于java中的HashMap结构。

String结构是将对象序列化为JSON字符串后存储，需要修改字段不方便。

Hash结构可以将对象中的每个字段独立存储，可以针对单个字段做CRUD

![image-20230629225158089](/images/中间件/redis/hash结构数据.png)

常见命令：

- HSET key field value：添加或者修改hash类型key的field的值
- HGET key field：获取一个hash类型key的field的值
- HMSET： 批量添加多个hash类型key的field的值
- HMGET：批量获取多个hash类型key的field的值
- HGETALL：获取一个hash类型的key中的所有得field和value
- HKEYS：获取一个hash类型中的key中的所有field
- HVALS：获取一个hash类型中的key中的所有value
- HINCRBY：让一个hash类型key的字段值自增并指定步长
- HSETNX：添加一个hash类型的key的field值，前提是这个field不存在，否则不执行

### 6.5 List类型

Redis中的Listl类型与java中的LindedList类似，可以看做是一个双向链表。既可以支持正常检索和也可以支持反向检索。

特征与LinkList类似：

- 有序
- 元素可以重复
- 插入和删除快
- 查询速度一般

常用来存储一个有序数据，例如：朋友圈点赞，评论列表。

常见命令：

- LPUSH KEY ELEMENT...:向列表左侧插入一个或多个元素
- LPOP key：移除并返回列表左侧的第一个元素，没有则返回nil
- RPUSH key element ...：向列表右侧插入一个或多个元素
- RPOP key：移除返回列表右侧的第一个元素
- LRANGE key start end：返回一段角标范围内的所有元素
- BLPOP和BRPOP：与LPOP和RPOP类似，只不过在没有元素时等待指定时间，而不是直接返回nil

1、如何利用LIst结构模拟一个栈 LPUSH LPOP

2、如何利用LIst结构模拟一个队列?

3、如何利用LIst结构模拟一个阻塞队列 

入口出口同边，出队时采用 BLPOP BRPOP

### 6.6 Set类型

Redis的Set结构和Java中的HashSet类似，可以看做是一个value为null的HashMap.因为也是一个hash表，因此具备与HashSet类似的特征

- 无序
- 元素不可重复
- 查找快
- 支持交集、并集、差集等

Set类型常见的命令：

String的常见命令有：

- SADD KEY MEMBER ...:向Set中添加一个或多个元素
- SREM key member...: 移除set中的指定元素
- SCARD key : 返回set中元素的个数
- SISMEMBER key member:判断一个元素是否存在set中
- SMEMBERS：获取set中的所有元素

- SINTER key1 key2  ...：求key1和key2的集合
- SDIFF key1 key2 ...:求key1和key2的差集
- SUNION key1 key2...:求key1和key2的并集

### 6.7 SortSet类型（默认升序）

Redis的SortSet是一个可排序的set集合，与Java中的TreeSet有些类似，但底层的数据结构差别很大，SortSet中的每一个元素都带有一个score属性，可以基于score属性对元素进行排序，底层实现是一个跳表（SkipList）加Hash表。

SortSet具备以下特性：

- 可排序
- 元素不可重复
-  查询速度快

因为SortSet的可排序性，经常被用来实现排行榜功能。

SortSet类型的常见命令：

- ZADD key score member:添加一个或多个元素到sorted set，如果已经存在则更新其score值

- ZREM key member:删除sorted set中的每一个指定元素

- ZSCORE key member:获取sorted set 中的指定元素的排名
- ZRANK key member:获取sortset中指定元素的排名
- ZCARD key ：获取sorted set中的元素个数
- ZCOUNT key min max:获取score只在给定范围内的所有元素个数
- ZINCRBY key increament member:让sorted set中的指定元素自增，步长为指定的increment值
- ZRANGE key min max：按照score排序后，获取指定范围内的元素
- ZRANGEBYSCORE key min max：按照score排序后，获取指定score范围内的元素
- ZDIFF、ZINTER、ZUNION：求差集、交集、并集

注意：所有排名默认升序，如果要降序则在命令的Z后面添加REV即可

### 6.8 GEO类型

![image-20230906200320861](D:\study\vuepress-starter\docs\.vuepress\public\images\中间件\redis\GEO数据类型.png)

### 6.9 、BitMap

set get filed 

###  6.10、HypeLogLog

set count

## 7、Redis客户端

### 7.1、 Jedis基本使用步骤

1. 引入依赖
2. 创建Jedis对象，建立连接。

### 7.2、Jedis连接池

Jedis本身是线程不安全的，并且频繁的创建和销毁链接会有性能损耗，推荐使用Jedis连接池代替Jedis直连方式

````java
import redis.clients.jedis.Jedis;
import redis.clients.jedis.JedisPool;
import redis.clients.jedis.JedisPoolConfig;
import redis.clients.jedis.JedisSentinelPool;

public class JedisConnectFactory {
    private static final JedisPool jedisPool;

    static {
        //配置连接池
        JedisPoolConfig poolConfig = new JedisPoolConfig();
        poolConfig.setMaxTotal(8);//最大连接数
        poolConfig.setMaxIdle(8);//最大实例数
        poolConfig.setMinIdle(0);//最小实例数
        poolConfig.setMaxWaitMillis(1000);//最大等待时间，结束关闭实例
        //配置连接池对象
        jedisPool = new JedisPool(poolConfig,
                "121.43.102.182",6379,1000,"123321");
    }

    public static Jedis getResource(){
        return jedisPool.getResource();
    }
}
````

### 7.3、Spring Data Redis

SpirngData是Spring中数据操作的模块，包含对各种数据库的继承，其中对Redis的集成模块叫做Spirng Data Redis

* 提供了对不同Redis客户端的整合（Lettuce和Jedis）
* 提供了RedisTemplate统一App来操作Redis
* 支持Redis的发布订阅模式
* 支持Redis哨兵和Redis集群
* 支持基于Letuce的响应式编程
* 支持基于JDK、JSON、字符串、Spirng对象的数据序列化和反序列化
* 支持基于Redis的JDKCollection的实现

![image-20230706225302710](/images/中间件/redis/SpringDataRedis工具类RedisTemplate.png)

使用步骤：

1. 引入spring-boot-starter-data-redis依赖
2. 在application.yml配置Redis信息
3. 注入RedisTemplate

设置键值的序列化方式(默认使用JDK自带序列化方式，把java对象转为字节写入Redis：ObjectOutPutStream)

````java
@Configuration
public class RedisConfig {

    @Bean
    public RedisTemplate<String,Object> redisTemplate(RedisConnectionFactory connectionFactory)
            throws UnknownHostException{
        //创建RedisTemplate对象
        RedisTemplate<String, Object> template = new RedisTemplate<>();
        //设置连接工厂
        template.setConnectionFactory(connectionFactory);
        //创建JSON序列化工具
        GenericJackson2JsonRedisSerializer jsonRedisSerializer = new GenericJackson2JsonRedisSerializer();
        //设置key的序列化
        template.setKeySerializer(RedisSerializer.string());
        template.setHashKeySerializer(RedisSerializer.string());
        //设置value的序列化
        template.setValueSerializer(jsonRedisSerializer);
        template.setHashValueSerializer(jsonRedisSerializer);
        //返回
        return template;
    }

}
````

JSON序列化方式可以满足我们的需求，但仍然存在问题，存储class字节码，为了反序列化知道对象的类型，JSON序列化器会将类的class类型写入json结果中，存入Redis，会带来额外的内存开销 

为了节省空间，我们不是用JSON序列化器处理value，而是统一使用String序列化器，要求只能存储String类型的key和value，当需要存在java对象时，手动完成对象的序列化和反序列化

spring提供了一个StringRedisTemplate类，默认key和value都是String方式，省去自定义RedisTemplate的过程



RedisTemplate的两种序列化方案：

方案一：

1. 自定义RedisTemplate
2. 修改RedisTemplate的序列化器为GenericJackson2JsonRedisSerializer

方案二：

1. 使用RedisTemplate
2. 写入Redis时，手动把对象序列化（ObjectMapper）
3. 读取Redis时，手动把读取到的JSON反序列化为对象

````java
private static final ObjectMapper mapper = new ObjectMapper();

    @Test
    void testSaveUser() throws JsonProcessingException {
        User liyong = new User("李勇", 25);
        //手动序列化
        String s = mapper.writeValueAsString(liyong);
        redisTemplate.opsForValue().set("user",s);
        String user = redisTemplate.opsForValue().get("user");
        User user1 = mapper.readValue(user, User.class);
        System.out.println(user1);
    }
````



方案三：StringRedisTemplate

## 8、Redis实践

### 8.1 登录

#### 8.1.1、基于Session登录

![image-20230713215947914](/images/中间件/redis/基于session登录.png)

session共享问题：多台tomcat不共享session存储空间，当请求切换到不同的tomcat服务器时导致数据丢失（数据拷贝：占内存，拷贝需要时间）

session替代方案需要满足：

* 数据共享
* 内存存储
* key、value结构

#### 8.1.2、基于Redis实现共享session登录

![image-20230713224601252](/images/中间件/redis/登陆拦截器.png)

### 8.2 Redis缓存

缓存就是数据交换的缓冲区（cache），是存储数据的临时地方，一般读写性能较高  

缓存作用：

* 降低后端负载
* 提高读写效率，降低响应时间

缓存成本：

* 数据一致性成本
* 代码维护成本

![image-20230713225759436](/images/中间件/redis/缓存模型.png)



#### 8.2.1、Redis缓存更新策略

|          |                           内存淘汰                           | 超时剔除                                                     | 主动更新                               |
| -------- | :----------------------------------------------------------: | :----------------------------------------------------------- | :------------------------------------- |
| 说明     | 不用自己维护，利用Redis的内存淘汰机制 当内存不足时自动淘汰部分数据，下次查询时更新缓存 | 给缓存的数据添加TTL时间到，到期后自动删除缓存，下次查询时更新缓存 | 编写业务逻辑，在修改数据库时，更新缓存 |
| 一致性   |                              差                              | 一般                                                         | 好                                     |
| 维护成本 |                              无                              | 低                                                           | 高                                     |

业务场景：

- 低一致性需求：使用内存淘汰机制，比如店铺类型的缓存
- 高一致性的需求：主动更新，并以超时剔除作为兜底方案，例如店铺详情查询缓存

主动更新方式：

1. 由缓存的调用者，在更新数据库的同时更新缓存（常用）
2. 混存于数据库整合为一个服务，由服务维护一致性，调用者调用该服务，无需关心缓存一致性问题
3. 调用者只操作缓存，由其他的线程异步的将缓存数据持久化到数据库，保证最终一致性

操作缓存和数据库时有三个问题需要考虑：

1. 删除缓存还是更新缓存？

   * 更新缓存：每次更新数据库都更新缓存，无效写操作过多，×不适用
   * 删除缓存：更新数据库让缓存失效，查询时再更新缓存

2. 如何保证缓存与数据库的操作的同时成功或失败

   * 单体系统，将缓存与数据库操作方在同一个事务
   * 分布式系统，利用TCC等分布式事务系统

3. 先操作缓存还是先操作数据库

   * 先删除缓存，后操作数据库

     ![image-20230717222205765](/images/中间件/redis/缓存线程问题.png) 

   * 先操作数据库，后更新缓存

   缓存更新策略：

   1. 低一致性需求：使用Redis自带的内存淘汰机制
   2. 高一致性需求：主动更新，并以超时剔除作为兜底方案

   * 读操作
     - 缓存命中直接返回
     - 缓存未命中则查询数据库，并写入缓存，设定超时时间
   * 写操作：
     * 先写数据库，然后再删除缓存
     * 要确保数据库缓存操作的原子性

#### 8.2.2 、缓存穿透

缓存穿透是指客户端请求的数据在缓存中和数据库中都不存在，这样缓存永远不会生效，这些请求都会打到数据库。

常见的解决方案：

- 缓存空对象
  - 优点：实现简单，维护方便
  - 缺点：额外的内存消耗，可能造成短期的不一致。
- 布隆过滤
  - 优点：内存占用较少，没有多余key
  - 缺点：实现复杂，存在误判机制
  - 增强ID的复杂度，避免被猜测id规律
  - 做好数据的基础格式校验
  - 加强用户权限校验
  - 做好热点参数的限流

![image-20230717224354775](/images/中间件/redis/缓存穿透.png)

#### 8.2.3、缓存雪崩

缓存血崩是指在同一时间段大量的缓存key同时失效或者Redis宕机，导致大量请求到大数据库，带来巨大压力

解决方案：

- 给不同的key的TTL添加随机值
- 利用Redis集群提高服务的可用性
- 给缓存业务添加降级限流策略
- 给业务添加多级缓存

![image-20230717230019261](/images/中间件/redis/缓存血崩.png)

#### 8.2.4、缓存击穿

缓存击穿问题也叫热点key问题，就是一个被高并发访问并且缓存重建业务比较复杂，无数的请求访问会在瞬间给数据库带来巨大的冲击

- 互斥锁
  * setnx key value 当key不存在的时候才会存储
- 逻辑过期

![image-20230718222800176](/images/中间件/redis/缓存击穿问题解决.png)

![image-20230718222823784](/images/中间件/redis/缓存击穿解决方案优缺点.png)

- 基于互斥锁实现（获取锁成功后，在查询数据库之前需要在此判断redis中是否存在缓存值）

![image-20230718224849626](/images/中间件/redis/互斥锁解决缓存击穿.png)

- 逻辑过期解决缓存穿透（获取锁成功应该再次检测 redis缓存是否过期，DoubleCheck，如果存在则无需重建缓存）

![image-20230718225314636](/images/中间件/redis/逻辑过期解决缓存穿透.png)

## 9、Redis实现秒杀

### 9.1、全局唯一ID

自增ID缺点：

- id规律性明显（多表存储订单，id出现重复现象）
- 受单表数据量的限制

全局ID生成器

特性：唯一性、高可用、高性能、递增、安全性

符号位（1bit）+ 时间戳（31bit）+ 序列号（32bit 秒内计数器，支持每秒产生2^32个不同的ID）

### 9.2、实现优惠券秒杀的下单功能

下单时需要判断两点：

- 秒杀是否开始或结束，如果尚未开始或者已经结束则无法下单
- 库存是否充足，不足则无法下单

![image-20230722084920814](/images/中间件/redis/秒杀流程.png)

![image-20230722100453212](/images/中间件/redis/超卖问题.png)

超卖问题典型的多线程问题，针对这一问题常见解决方案就是加锁：

![image-20230722100841995](/images/中间件/redis/乐观锁悲观锁.png)

乐观锁方案：

- 版本号法（在进行库存更新时判断查询出来的版本号是否变化）

![image-20230722101157423](/images/中间件/redis/乐观锁-版本号法.png)

- CAS法（在进行库存更新时判断查询出来的库存数量是否变化（优化：判断库存剩余是否大于0））

![image-20230722101356026](/images/中间件/redis/乐观锁-CAS法.png)

总结：

1. 悲观锁：添加同步锁，让线程串行执行

- 优点：简单粗暴
- 缺点：性能一般

2. 乐观锁：不加锁，在更新时判断是否有其他线程在修改

- 优点：性能好
- 缺点：存在成功率低的问题

### 9.3、实现一人一单功能

1. 在用户下单之前，判断用户是否已经下过单了
2. 加悲观锁Synchronized，

- 粒度为用户ID，使用userID.toString().intern方法，因为tostring（）方法每次调用，不管字符串常量池是否存在，都会生成一个新的字符串；intern（）方法是从字符串常量吃中找相等的值，存在就不新建，不存在才新建，锁定范围变小，性能增强
- 为了保证每个事物结束并且提交，锁需要加在方法上，锁内代码块包含：判断用户是否下过单，扣减库存，创建订单锁 
- 事务由spring管理，我们应该得到spirng的代理对象，之后使用代理对象调用该方法，该方法的事务才能生效，使用 AopContext.currentProxy()方法拿到代理对象，代理对象需要添加在接口中。需要添加aspectjweaver依赖，启动类添加@EnableAspectJAutoProxy（expose = true）暴露该对象 (分布式情况下会有问题)

###  9.4、分布式锁

定义：满足分布式系统或集群模式下多进程可见并且互斥的锁

![image-20230723093948850](/images/中间件/redis/分布式锁.png)

分布式锁的核心是实现多进程之前互斥，而满足这一点的方式有很多，常见的有三种：

 ![image-20230723095925506](/images/中间件/redis/分布式锁的实现.png)

基于Redis实现分布式锁需要实现两个基本的方法：

线程加锁：Thread.currentThread().getId();获取锁的ID

- 获取锁
  - 互斥：确保只有一个线程获取锁 setnx key value
  - 非阻塞：尝试一次，成功返回true，失败返回false
- 释放锁（获取完锁后宕机，使用set key value ex 10 nx 保证原子性，同时成功，同时失败）
  - 手动释放 del key
  - 超市释放：获取锁添加一个超时时间

![image-20230723102745114](/images/中间件/redis/分布式锁流程.png)

改进Redis的分布式锁

需求：锁误删问题：线程一的业务执行未结束，锁超时释放，而redis中的锁已经删除，这时线程二来执行获取到锁执行任务，这期间，线程一任务执行完毕，删除锁，这是线程三就又可以获取到锁，加锁唯一标识，防止锁误删。修改之前的分布式锁实现，满足：（UUID+线程标识）

1. 在获取锁是存入线程标示（或UUID）
2. 在释放锁实现获取锁中的线程标示，判断是否与当前线程标示一致
   * 如果一致则释放锁
   * 如果不一致则不释放锁

使用LUA脚本实现加锁释放锁操作的原子性（判断锁表识操作和删除锁操作）

线程一在进行锁判断之后进程阻塞，线程二进来获取锁执行业务，这是线程一阻塞结束，由于已经进行过锁判断，直接删除锁，导致锁误删，导致线程三进来可以获取锁，继续执行

![image-20230723110905553](/images/中间件/redis/LUA脚本.png)

### 9.5、基于Redis的分布式锁的实现思路

- 利用set nx获取锁，并设置过期时间，保存线程标识
- 释放锁时先判断线程标识是否与自己的意志，一致则删除锁

特性：

- 利用set nx满足互斥性
- 利用 set ex保证故障时锁依然能释放，避免思索，提高安全性
- 利用Redis集群保证高可用和高并发特性

###  9.6、基于Redis的分布式锁优化

基于setnx实现分布式锁存在下面问题：

1. 不可重入：同一个线程无法多次获取同一把锁，同一个线程无法获取同一把锁

2. 不可重试：获取锁只尝试一次就返回false，没有重试机制

3. 超时释放：锁超时释放虽然可以避免死锁，但如果是业务执行耗时较长，也会导致锁释放，存在安全隐患
4. 主从一致性：如果Redis提供了主从集群，主从同步存在延迟，当主宕机是，如果从并同步主中的锁数据，则会出现锁实现

## 10、Redisson

### 10.1、简介

![image-20230726214210666](/images/中间件/redis/Redisson简介.png)

### 10.2、入门

![image-20230726214632667](/images/中间件/redis/Redisson锁入门1.png)

![image-20230726214659445](/images/中间件/redis/Redisson锁入门2.png)

在无参数获取锁时，默认等待时间-1，获取不到立即返回，默认等待时间30s

### 10.3、原理

#### 10.3.1、锁重入

利用Hash数据结构保存key为线程标识value为锁的重入次数

![image-20230730094835755](/images/中间件/redis/Redisson原理1.png)

获取锁LUA脚本

![image-20230730094949158](/images/中间件/redis/获取锁LUA脚本.png)

释放锁LUA脚本

![image-20230730095016475](/images/中间件/redis/释放锁LUA脚本.png)

#### 10.3.2、锁重试

- 基于信号量和pubsub发布订阅功能实现等待、唤醒，获取锁失败的重试机制
- 超时续约：利用watchDog，每隔一段时间（realeaseTime/3）,重置超时时间

![image-20230730101327025](/images/中间件/redis/Redisson锁重试.png)

#### 10.3.2、Redisson分布式主从一致性问题

![image-20230730103742763](/images/中间件/redis/Redis的MultiLock锁.png)

## 11、Redis秒杀优化

![image-20230731204813963](D:\study\vuepress-starter\docs\.vuepress\public\images\中间件\redis\秒杀优化.png)

### 11.2、秒杀解决方案

![image-20230731205405425](D:\study\vuepress-starter\docs\.vuepress\public\images\中间件\redis\秒杀解决方案.png)

![image-20230731211303092](D:\study\vuepress-starter\docs\.vuepress\public\images\中间件\redis\需要解决问题.png)

## 12、消息队列

### 12.1、消息队列简介

![image-20230801210144544](D:\study\vuepress-starter\docs\.vuepress\public\images\中间件\redis\消息队列简介.png)

### 12.2、List集合实现消息队列

消息队列（Message Queue），字面意思就是存放消息的队列，Redis的list数据结构是一个双向链表，很容易模拟出队列的效果。

队列的出入口不是在同一边，可以使用LPUSH和RPOP或者RPUSH和LPOP实现

BRPOP或者BLPOP 实现阻塞等待，

使用JVM自带的阻塞队列可能会造成内存溢出。

基于List的消息队列有哪些优缺点？

优点：

1. 利用Redis存储，不受限于JVM内存上线
2. 基于Redis的持久化机制，数据安全性有保证
3. 可以满足消息的有序性

缺点：

1. 无法避免消息丢失（LPOP是remove get，无法保证可靠消费）
2. 只支持单消费者（一条消息只能被消费一次）

### 12.3、基于PubSub的消息队列

PubSub（发布订阅）是Redis2.0版本引入的消息传递模型，顾名思义，消费者可以订阅一个或多个channel，生产者向对应的channel发布消息 后，所有订阅者都能收到相关消息。

- SUBSCRIBE channel[channel]:订阅一个或多个频道
- PUBLISH channel msg；像一个频道发送消息
- PUSUBSCRIBE pattern[pattern]:订阅与pattern格式匹配的所有频道 
- ？一个字符 *一个或多个字符 [ao]指定字符

优点：

1. 采用发布订阅模式，支持多生产、多消费

缺点：

1. 不支持数据持久化
2. 无法避免消息丢失
3. 消息堆积有上限，超出时数据丢失（消息缓存在消费者方，消费方消费慢，超出就会丢失）

### 12.4、基于Stream的消息队列

Stream是Redis5.0引入的一种新数据类型，可以实现一个功能非常完善的消息队列

![image-20230801212311992](D:\study\vuepress-starter\docs\.vuepress\public\images\中间件\redis\Stream命令.png)

XADD |消息名称 | 如果队列不存在，是否自动创建队列，默认自动创建 | 设置消息队列的最大消息数量 | 指定消息的唯一ID（*代表Redis自己生成ID）自定格式规则：时间戳-递增数字|发送到消息中的消息体，entry键值对，可有多个键值对

XADD 添加消息

XLEN 长度

![image-20230801212804029](D:\study\vuepress-starter\docs\.vuepress\public\images\中间件\redis\Stream读取消息.png)

![image-20230801213305717](D:\study\vuepress-starter\docs\.vuepress\public\images\中间件\redis\代码实现阻塞队列及问题.png)

Stream类型消息队列XREAD命令特点：

- 消息可回溯
- 一个消息可以被多个消费者读取
- 可以阻塞读取
- 有消息漏读的风险

### 12.5、基于Stream的消息队列-消费者组

消费者组：将多个消费者划分到一个组中，监听同一个队列。具备以下特点：

1、消息分流：队列中的消息会分流给组内的不同消费者，而不是重复消费，从而加快消息处理的速度

2、消息标示：消费者会维护一个标示，记录最后一个被处理的消息，哪怕消费者宕机重启，还会从标示之后读取消息，确保每一个消息都会被消费

3、消息确认：消费者获取消息后，消息处于pending状态，并存入一个pending-list。档处理完成后需要通过xack来确认消息，标记消息为已处理，才会从pending-list移除

创建消费者组：

````sh
XGROUP CREATE KEY GROUPNAME ID [MKSTREAM]
````

KEY:队列名称

groupname：消费者组名称

id：起始ID标示，$代表队列汇总最后一个消息，0则代表队列中第一个消息

mkstream：队列不存在时自动创建

其他常见命令：

````sh
# 删除指定的消费者组
XGROUP DESTORY KEY GROUPNAME
#给指定的消费者组添加消费者
XGROUP CREATECONSUMER KEY GROUPNAME CONSUMERNAME
# 删除指定消费者组中的指定消费者
XGROUP DELCONSUMER KEY GROUPNAME CONSUMERNAME
````

![image-20230802195109524](D:\study\vuepress-starter\docs\.vuepress\public\images\中间件\redis\从消费者组读取消息.png)

消息确认：XACK 对列名称 组名称 key key 

XPENDING 队列名称 组名称  - + 10 返回所有未确认消息

 STREAM类型消息队列的XREADGROUP命令特点：

- 消息可回溯
- 可以多消费者争抢消息
- 可以阻塞读取
- 没有消息漏读风险
- 有消息确认机制，保证消息至少被消费一次

### 12.6 Redis实现消息队列总结

![image-20230802200503505](D:\study\vuepress-starter\docs\.vuepress\public\images\中间件\redis\Redis消息队列总结.png)

### 12.7、Redis实现点赞功能和实现点赞排行榜功能

1. Redis实现点赞功能使用Set类型，唯一 sidmember判断是否存在
2. Redis实现点赞排行榜功能使用Zset，有分数，利于排序，使用点赞时间戳作为分数。Zscore获取指定元素的分数，如果元素存在才会存在分数，不存在分数就为null，这样实现点赞用户唯一。Zrange拿出点赞排行榜前五名， mysql使用in查询，默认根据用户id升序查出，可以使用order by field（userId,5,1...）根据指定顺序查出。

### 12.8、关注、共同关注、

1. SET集合实现共同关注 SINTER 取两个SET集合的交集

### 12.9、滚动分页查询

使用Zset  分数为时间戳

max：第一次：最大时间戳|上次一查询的最小时间戳

min：0

offset：第一次：0|上一次查询最小值一样的个数

count：每页的个数

## 13、数据持久化

1、RDB(Redis Database Backup file)Redis数据备份文件，也被叫做数据快照。简单来说就是把内存中的所有数据都记录到磁盘上。当Redis实例故障重启后，从磁盘读取快照文件，恢复数据。（默认开启）

快照文件称为RDB文件，默认是保存在当前运行目录

redis -cli：连接Redis

save：由Redis主进程来执行RDB，会阻塞所有命令

bgsave：backgroud save 开启资金性质行RDB，避免主进程收到影响

Redis停机是会执行一次RDB

2、Redis内部有触发 RDB的机制，可以再redis.conf文件中找到，格式如下：

#900秒内，如果至少有1个key被修改，则执行bgsave，如果是save ""则表示禁用RDB

save 900 1

RDB的其他配置也可以在redis.conf文件中设置：

#是否压缩。建议不开启，压缩会消耗cpu，磁盘便宜

rdbcompression yes

#RDB文件名称

dbfilename dump.rdb

#文件保存的路径目录

dir ./

RDB原理：bgsave开始时会fork主进程得到子进程，子进程共享主进程的内存数据。完成fork后读取内存数据并写入RDB文件。（Linux系统中，所有的进程都无法操作物理内存，会由操作系统给每个进程分配一个虚拟内存，操作系统会维护一个虚拟内存和物理内存的一个映射关系表，这个表称为页表。fork的过程中，不拷贝内存数据，只拷贝页表，子进程拿到页表后就可以拿到主进程的数据，达到共享内存数据。之后子进程会读内存中的数据并写入磁盘，写新的RDB文件，替换旧的RBD文件。由于fork是异步执行，子进程在执行读写过程中，主进程可能会修改数据，为了避免这个问题，fork采用copy-on-write技术，当主进程执行读操作时，访问共享内存；当主进程执行写操作时，则会拷贝一份数据，执行写操作。极端情况：子进程写数据很慢，主进程中数据完全修改，导致会使用双倍内存）

RDB方式bdsave基本流程？

1. fork主进程得到一个子进程，共享主进程内存空间（由于在Linux系统中，所有的进程都无法操作物理内存，会由操作系统分配一个虚拟内存，这个虚拟内存和物理内存有个映射关系表，称为页表，fork子进程只拷贝页表，不拷贝内存数据，拿到页表后就可以拿到主进程的内存数据，达到内存数据共享）、
2. 子进程读取内存数据并写入RDB文件（写会存在问题：子进程在执行写的过程中，主进程可能会修改数据，为了避免这个数据，fork采用copy-on-write技术，当主进程执行读操作时，访问共享内存；当主进程执行写操作时，则会拷贝一份数据，执行写操作。极端情况：子进程写数据很慢，主进程中数据完全修改，导致会使用双倍内存）
3. 采用新的RDB文件替换就得RDB文件。

RDB会在什么时候执行？

save：服务停机时汇之星

bgsave：比如 save 60 1000 代表60秒内1000次修改触发RDB

RDB缺点？

1. RDB执行间隔时间长，两次RDB之间写入数据有丢失数据的风险
2. fork子进程、压缩、写出RDB文件都比较耗时

 

