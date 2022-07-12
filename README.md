# 21 天

## How to start

```bash
pnpm

# dev 后台管理
pnpm run dev:web
# build 后台管理
pnpm run build:web

# dev 微信小程序
pnpm run dev:weapp
# build 微信小程序
pnpm run build:weapp
```

## pnpm 简单的使用指南

```bash

# 全局安装依赖
pnpm add -w typescript
# 全局安装 Dev 依赖
pnpm add -w -D typescript

# 给某个 package 安装依赖
pnpm add @nice-21day/shared --filter @nice-21day/web

```