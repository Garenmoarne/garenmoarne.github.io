// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC2okltvvgt88KQptDvFg7LvY_SGNr9N9s",
  authDomain: "chatting-3bf48.firebaseapp.com",
  databaseURL: "https://chatting-3bf48-default-rtdb.asia-southeast1.firebasedatabase.app/",
  projectId: "chatting-3bf48",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "803318274234",
  appId: "1:803318274234:web:2d5a7aed9b9b23119f4a83",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const database = firebase.database();
const auth = firebase.auth();

// Authenticate anonymously
auth.signInAnonymously();

document
  .getElementById("chat-form")
  .addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent the form from submitting

    const messageInput = document.getElementById("message-input");
    const messageText = messageInput.value.trim();

    if (messageText !== "") {
      const message = {
        text: messageText,
        timestamp: Date.now(),
        user: auth.currentUser.uid,
      };

      // Push the message to Firebase Realtime Database
      database.ref("messages").push(message);

      // Clear the input field
      messageInput.value = "";
    }
  });

// Listen for new messages
database.ref("messages").on("child_added", function (snapshot) {
  const message = snapshot.val();
  const chatBox = document.getElementById("chat-box");
  const messageElement = document.createElement("p");
  messageElement.textContent = message.text;
  chatBox.appendChild(messageElement);

  // Scroll to the bottom of the chat box
  chatBox.scrollTop = chatBox.scrollHeight;
});
