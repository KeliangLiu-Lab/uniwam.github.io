# Deploy the UniWAM project page

The repository root is the complete static site. GitHub Pages can publish the `main` branch directly; no build command or server is required.

## Current release

- Full-length demos: public Hugging Face dataset at `https://huggingface.co/datasets/KeliangLiu2025/UniWAM`.
- The 33 entries in `assets/demos/manifest.json` use HTTPS video URLs, so the large source videos are not stored in GitHub.
- `CNAME` contains `uniwam.github.io`. GitHub Pages still needs the DNS record for that domain to point to GitHub Pages.

## Enable Pages

1. Open **Settings > Pages** in `KeliangLiu2023/uniwam.github.io`.
2. Set **Source** to **Deploy from a branch**.
3. Select branch `main` and folder `/ (root)`, then save.
4. Wait for the first deployment. The repository URL is `https://keliangliu2023.github.io/uniwam.github.io/`; with the supplied `CNAME` and DNS configured, the custom URL is `https://uniwam.github.io/`.

## Future updates

```bash
cd "/Users/lkl/Desktop/技术报告"
git add index.html styles.css script.js assets CNAME DEPLOY.md .gitignore
git commit -m "Update UniWAM project page"
git push origin main
```

Do not add `assets/demos/**/*.mp4` or `*.mov` to GitHub. Upload new full-length videos to the Hugging Face dataset and update the corresponding `video` URL in the manifest.
