# Vue 3 + Vite

This template should help get you started developing with Vue 3 in Vite. The template uses Vue 3 `<script setup>` SFCs, check out the [script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) to learn more.

Learn more about IDE Support for Vue in the [Vue Docs Scaling up Guide](https://vuejs.org/guide/scaling-up/tooling.html#ide-support).

### 
```
npm install vue-router@4
```

### after terraform apply
* Github Repo Page -> Settings → Secrets and variables → Actions → Variables → New repository variable
* terraform apply will output those value at terminal
    * DEPLOY_ROLE_ARN → 你 Terraform 输出的 github_actions_role_arn
	* DEPLOY_BUCKET → 你 Terraform 输出的 bucket_name
	* CF_DIST_ID → 你 Terraform 输出的 cloudfront_distribution_id


### trigger off
