<!-- <template>
  <footer class="landing-footer">
    <BaseContainer>
      <div class="landing-footer__top">
        <div>
          <AppLogo />
          <p class="landing-footer__blurb">
            Secure financial settlement for Kenya's coffee value chain.
          </p>
        </div>

        <div class="landing-footer__links">
          <div>
            <h4>Resources</h4>
            <a href="#">Support</a>
            <a href="#">Privacy</a>
            <a href="#">Terms</a>
          </div>

          <div>
            <h4>Language</h4>
            <div class="landing-footer__language">
              <button class="active">EN</button>
              <button>SW</button>
            </div>
          </div>
        </div>
      </div>

      <div class="landing-footer__bottom">
        <span>© 2026 Coffee DSS. All rights reserved.</span>
        <span>Authorized access only · Built for Kenya's coffee sector</span>
      </div>
    </BaseContainer>
  </footer>
</template>

<script setup>
import BaseContainer from '@/components/base/BaseContainer.vue'
import AppLogo from '@/components/shared/AppLogo.vue'
</script>

<style scoped>
.landing-footer {
  background: var(--color-primary);
  color: rgba(255, 255, 255, 0.9);
  padding: 72px 0 36px;
}

.landing-footer__top {
  display: flex;
  justify-content: space-between;
  gap: 40px;
  padding-bottom: 36px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.landing-footer__blurb {
  margin-top: 24px;
  max-width: 360px;
  line-height: 1.7;
  color: rgba(255, 255, 255, 0.72);
}

.landing-footer__links {
  display: flex;
  gap: 80px;
}

.landing-footer__links h4 {
  margin: 0 0 16px;
  font-size: 0.95rem;
  text-transform: uppercase;
  opacity: 0.75;
}

.landing-footer__links a {
  display: block;
  margin-bottom: 14px;
}

.landing-footer__language {
  display: inline-flex;
  border: 1px solid rgba(255, 255, 255, 0.16);
  border-radius: 12px;
  overflow: hidden;
}

.landing-footer__language button {
  border: none;
  background: transparent;
  color: white;
  padding: 10px 18px;
  cursor: pointer;
}

.landing-footer__language .active {
  background: var(--color-accent);
}

.landing-footer__bottom {
  display: flex;
  justify-content: space-between;
  gap: 24px;
  padding-top: 28px;
  font-size: 0.95rem;
  color: rgba(255, 255, 255, 0.62);
}

@media (max-width: 900px) {
  .landing-footer__top,
  .landing-footer__bottom,
  .landing-footer__links {
    flex-direction: column;
  }
}
</style> -->

<template>
  <footer class="landing-footer">
    <div class="landing-footer__container">
      <div class="landing-footer__top">
        <div class="landing-footer__brand">
          <AppLogo />
          <p class="landing-footer__blurb">
            Secure financial settlement for Kenya's coffee value chain.
          </p>
        </div>

        <div class="landing-footer__links">
          <div class="landing-footer__group">
            <h4>Resources</h4>
            <a href="#">Support</a>
            <a href="#">Privacy</a>
            <a href="#">Terms</a>
          </div>

          <div class="landing-footer__group">
            <h4>Language</h4>
            <div class="landing-footer__language">
              <button class="active">EN</button>
              <button>SW</button>
            </div>
          </div>
        </div>
      </div>

      <div class="landing-footer__bottom">
        <span>© {{currentYear}} Coffee DSS. All rights reserved.</span>
        <span>Authorized access only · Built for Kenya's coffee sector</span>
      </div>
    </div>
  </footer>
</template>

<script setup>
import AppLogo from '@/components/shared/AppLogo.vue'
const currentYear = new Date().getFullYear()
</script>

<style scoped>
.landing-footer {
  background: var(--color-primary);
  color: rgba(255, 255, 255, 0.9);
  padding: 72px 0 36px;
}

/* footer-specific container instead of BaseContainer */
.landing-footer__container {
  width: 100%;
  padding: 0 5.25rem; /* 84px left/right - adjust if needed */
  box-sizing: border-box;
}

.landing-footer__top {
  display: flex;
  justify-content: space-between;
  gap: 40px;
  padding-bottom: 36px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.landing-footer__brand {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.landing-footer__blurb {
  margin-top: 24px;
  max-width: 360px;
  line-height: 1.7;
  color: rgba(255, 255, 255, 0.72);
}

.landing-footer__links {
  display: flex;
  gap: 80px;
}

.landing-footer__group h4 {
  margin: 0 0 16px;
  font-size: 0.95rem;
  text-transform: uppercase;
  opacity: 0.75;
}

.landing-footer__group a {
  display: block;
  margin-bottom: 14px;
  color: inherit;
  text-decoration: none;
}

.landing-footer__language {
  display: inline-flex;
  border: 1px solid rgba(255, 255, 255, 0.16);
  border-radius: 12px;
  overflow: hidden;
}

.landing-footer__language button {
  border: none;
  background: transparent;
  color: white;
  padding: 10px 18px;
  cursor: pointer;
}

.landing-footer__language .active {
  background: var(--color-accent);
}

.landing-footer__bottom {
  display: flex;
  justify-content: space-between;
  gap: 24px;
  padding-top: 28px;
  font-size: 0.95rem;
  color: rgba(255, 255, 255, 0.62);
}

@media (max-width: 900px) {
  .landing-footer {
    padding: 56px 0 28px;
  }

  .landing-footer__container {
    padding: 0 1.5rem;
  }

  .landing-footer__top,
  .landing-footer__bottom,
  .landing-footer__links {
    flex-direction: column;
  }
}
</style>