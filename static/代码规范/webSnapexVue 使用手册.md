# webSnapexVue 使用手册

### 安装使用

`webapp/3.0` || `webpcs/3.0` 目录下执行更新操作

```bash
npm install
```

`nginx` 添加配置文件

```bash
server {
    listen       9090;
    server_name localhost;
    ssi on;

    location / {
        root  项目路径;
        index index.php index.html index.htm;

        proxy_pass http://localhost:8085;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_set_header Host $host;
        proxy_buffering off;
    }
    
    location /app/ {
       proxy_pass http://47.75.183.88:8080/app/;
       client_max_body_size 2m;
    }
    location /sms/ {
       proxy_pass http://47.75.183.88:8080/sms/;
    }
}
```


### 操作执行

开启 `webpackServer` 服务之后即可通过 `本机IP + nginx端口` 访问项目

```
# 开启 webpackServer 服务环境
npm run dev

# 更新通用语言文件
npm run files

# 打包代码
npm run build
```

### 别名

项目中对路径做了处理，可调用简称

```
@           #资源目录 src
$basis      #通用文件 basis
$static     #静态目录 static
```


