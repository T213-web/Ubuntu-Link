import { db } from "./firebase.js";
import { collection, getDocs } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const helpListDiv = document.getElementById("helpList");

async function loadHelpList() {
  helpListDiv.innerHTML = "Loading...";

  try {
    const querySnapshot = await getDocs(collection(db, "helpRequests"));
    helpListDiv.innerHTML = "";

    if (querySnapshot.empty) {
      helpListDiv.innerHTML = "No help requests yet.";
      return;
    }

    querySnapshot.forEach((doc) => {
      const data = doc.data();
      const div = document.createElement("div");
      div.innerHTML = `<strong>${data.name}</strong>: ${data.need}`;
      helpListDiv.appendChild(div);
    });
  } catch (error) {
    console.error("Error loading help list:", error);
    helpListDiv.innerHTML = "Error loading help requests.";
  }
}

loadHelpList();