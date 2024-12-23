document
  .getElementById("chat-form")
  .addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent the form from submitting

    const messageInput = document.getElementById("message-input");
    const messageText = messageInput.value.trim();

    if (messageText !== "") {
      const chatBox = document.getElementById("chat-box");
      const messageElement = document.createElement("p");
      messageElement.textContent = messageText;
      chatBox.appendChild(messageElement);

      // Scroll to the bottom of the chat box
      chatBox.scrollTop = chatBox.scrollHeight;

      // Clear the input field
      messageInput.value = "";
    }
  });
