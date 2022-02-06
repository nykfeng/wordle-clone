const render = function () {
  const html = `
    <div class="error-background">
        <div class="error-box">
          <div class="error-title">
            <span>Error Encounted</span>
          </div>
          <div class="error-message">
            <span>There was an error requesting wordle word from server.<strong>
            </strong>This could be due to exceeding the 1,000 monthly request limit.</span>
          </div>
          <div class="error_btn-box">
            <button class="error_button--ok">OK</button>
          </div>
        </div>
      </div>
      `;
  const errorModal = document.querySelector(".confirm_dialog-background");
  if (!errorModal) {
    document.querySelector("body").insertAdjacentHTML("beforeend", html);
  }
};

export default {
  render,
};
