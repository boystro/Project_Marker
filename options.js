document.getElementById("saveButton").addEventListener("click", () => {
    const setting = document.getElementById("exampleSetting").value;
    chrome.storage.sync.set({ exampleSetting: setting }, () => {
      alert("Setting saved!");
    });
  });
  