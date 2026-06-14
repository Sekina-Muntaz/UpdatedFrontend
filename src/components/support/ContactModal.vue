<template>
  <div class="contact-modal">
    <div class="contact-modal__card">
      <button
        type="button"
        class="contact-modal__close"
        aria-label="Close contact form"
        @click="$emit('close')"
      >
        ×
      </button>

      <div class="contact-modal__header">
        <h2 class="contact-modal__title">Contact us</h2>
        <p class="contact-modal__subtitle">
          Submit a question to our support team. We’ll respond within one business day.
        </p>
      </div>

      <form class="contact-modal__form" @submit.prevent="onSubmit">
        <div class="contact-modal__field contact-modal__field--full">
          <label class="contact-modal__label" for="companyName">Company name</label>
          <input
            id="companyName"
            v-model.trim="form.companyName"
            class="contact-modal__input"
            type="text"
            placeholder="e.g. Kiambu Coffee Cooperative"
          />
        </div>

        <div class="contact-modal__grid">
          <div class="contact-modal__field">
            <label class="contact-modal__label" for="contactName">Contact person name</label>
            <input
              id="contactName"
              v-model.trim="form.contactName"
              class="contact-modal__input"
              type="text"
              placeholder="Full name"
            />
          </div>

          <div class="contact-modal__field">
            <label class="contact-modal__label" for="phoneNumber">Phone number</label>
            <input
              id="phoneNumber"
              v-model.trim="form.phoneNumber"
              class="contact-modal__input"
              type="tel"
              placeholder="+254 7XX XXX XXX"
            />
          </div>
        </div>

        <div class="contact-modal__field contact-modal__field--full">
          <label class="contact-modal__label" for="subject">Subject</label>
          <input
            id="subject"
            v-model.trim="form.subject"
            class="contact-modal__input"
            type="text"
            placeholder="What is this about?"
          />
        </div>

        <div class="contact-modal__field contact-modal__field--full">
          <label class="contact-modal__label" for="message">Message</label>
          <textarea
            id="message"
            v-model.trim="form.message"
            class="contact-modal__textarea"
            rows="5"
            placeholder="Share a few details about your request..."
          ></textarea>
        </div>

        <button
          type="submit"
          class="contact-modal__submit"
          :disabled="!isValid || submitting"
        >
          <span>{{ submitting ? "Sending..." : "Send message" }}</span>
          <span class="contact-modal__submit-icon">→</span>
        </button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { computed, reactive, ref } from "vue";

const emit = defineEmits(["close", "submit"]);

const form = reactive({
  companyName: "",
  contactName: "",
  phoneNumber: "",
  subject: "",
  message: ""
});

const submitting = ref(false);

const isValid = computed(() => {
  return (
    form.companyName.trim() !== "" &&
    form.contactName.trim() !== "" &&
    form.phoneNumber.trim() !== "" &&
    form.subject.trim() !== "" &&
    form.message.trim() !== ""
  );
});

const onSubmit = async () => {
  if (!isValid.value || submitting.value) return;

  submitting.value = true;

  try {
    emit("submit", { ...form });

    // keep this if parent handles API
    // otherwise replace with local API call
  } finally {
    submitting.value = false;
  }
};
</script>

<style scoped>
.contact-modal {
  position: fixed;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1.5rem;
  background: rgba(0, 0, 0, 0.28);
  z-index: 1000;
  box-sizing: border-box;
}

.contact-modal__card {
  position: relative;
  width: 100%;
  max-width: 34rem;
  border-radius: 0.75rem;
  background: #ffffff;
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.12);
  overflow: hidden;
}

.contact-modal__close {
  position: absolute;
  top: 1rem;
  right: 1rem;
  border: none;
  background: transparent;
  color: rgba(74, 68, 65, 0.55);
  font-size: 1.25rem;
  line-height: 1;
  cursor: pointer;
}

.contact-modal__header {
  padding: 1.25rem 1.5rem 1rem; /* ~20px top, 24px sides */
}

.contact-modal__title {
  margin: 0;
  color: #003525;
  font-family: "Nunito", sans-serif;
  font-size: 1.75rem;
  font-weight: 400;
  line-height: 2.125rem;
}

.contact-modal__subtitle {
  margin: 0.375rem 0 0;
  color: rgba(74, 68, 65, 0.72);
  font-family: "Nunito", sans-serif;
  font-size: 0.875rem;
  font-weight: 400;
  line-height: 1.375rem;
}

.contact-modal__form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 0 1.5rem 1.25rem; /* 24px sides, ~20px bottom */
}

.contact-modal__grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.75rem;
}

.contact-modal__field {
  display: flex;
  flex-direction: column;
  gap: 0.375rem;
}

.contact-modal__field--full {
  width: 100%;
}

.contact-modal__label {
  color: #003525;
  font-family: "Nunito", sans-serif;
  font-size: 0.75rem;
  font-weight: 600;
  line-height: 1rem;
}

.contact-modal__input,
.contact-modal__textarea {
  width: 100%;
  box-sizing: border-box;
  border: 1px solid #ddd8d0;
  border-radius: 0.5rem;
  background: #f7f4ef;
  color: #003525;
  font-family: "Nunito", sans-serif;
  font-size: 0.875rem;
  font-weight: 400;
  line-height: 1.25rem;
}

.contact-modal__input {
  height: 2.75rem;
  padding: 0 0.875rem;
}

.contact-modal__textarea {
  min-height: 7rem;
  padding: 0.875rem;
  resize: vertical;
}

.contact-modal__input::placeholder,
.contact-modal__textarea::placeholder {
  color: rgba(74, 68, 65, 0.4);
}

.contact-modal__submit {
  display: inline-flex;
  width: 100%;
  height: 2.75rem;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  border: none;
  border-radius: 0.25rem;
  background: #68ab00;
  color: #ffffff;
  font-family: "Nunito", sans-serif;
  font-size: 0.9375rem;
  font-weight: 600;
  line-height: 1rem;
  cursor: pointer;
}

.contact-modal__submit:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.contact-modal__submit-icon {
  display: inline-flex;
  align-items: center;
  line-height: 1;
}

@media (max-width: 640px) {
  .contact-modal__grid {
    grid-template-columns: 1fr;
  }

  .contact-modal__header,
  .contact-modal__form {
    padding-left: 1rem;
    padding-right: 1rem;
  }
}
</style>