document.addEventListener('DOMContentLoaded', () => {
    const downloadButtons = document.querySelectorAll('.download-btn');
    const searchInput = document.getElementById("search-input");
    const templateCards = document.querySelectorAll(".template-card");
    const tagElements = document.querySelectorAll(".keyword");

    // Download Button Logic
    downloadButtons.forEach(button => {
        button.addEventListener('click', () => {
            const template = button.getAttribute('data-template');
            const link = document.createElement('a');
            link.href = `downloads/${template}`;
            link.download = template;
            link.click();
        });
    });

    // Search Filter Logic
    searchInput.addEventListener("input", function () {
        const query = this.value.trim().toLowerCase();

        templateCards.forEach(card => {
            const tags = card.getAttribute("data-tags")?.toLowerCase() || "";
            const isMatch = tags.includes(query) || query === "";
            card.classList.toggle("hidden", !isMatch);
        });
    });

    // Tag Click = Filter
    tagElements.forEach(tag => {
        tag.addEventListener("click", () => {
            const tagText = tag.getAttribute("data-tag");
            searchInput.value = tagText;
            searchInput.dispatchEvent(new Event("input"));
        });
    });

    // File Upload Preview (optional enhancement)
    const fileInput = document.getElementById("actual-btn");
    fileInput?.addEventListener("change", function () {
        if (this.files && this.files[0]) {
            alert(`Selected file: ${this.files[0].name}`);
        }
    });
});



const modal = document.getElementById("uploadModal");
const btn = document.getElementById("upload-template-card");
const span = document.querySelector(".close");

btn.onclick = () => modal.style.display = "block";
span.onclick = () => modal.style.display = "none";
window.onclick = (event) => {
    if (event.target === modal) {
        modal.style.display = "none";
    }
};


// document.getElementById("templateUploadForm").addEventListener("submit", function (e) {
//     e.preventDefault();
//     // const name = document.getElementById("templateName").value;
//     // const keywords = document.getElementById("templateKeywords").value;
//     // const description = document.getElementById("templateDescription").value;
//     // const files = document.getElementById("templateFiles").files;

//     // need to send to backend or save to local storage
//     // console.log({ name, keywords, description, files });

//     // alert("Template submitted! (Form handling not yet implemented)");
//     // modal.style.display = "none";
//     // this.reset();

//     const name = document.getElementById('templateName').value;
//     const keywords = document.getElementById('templateKeywords').value;
//     // const file = document.getElementById('templateFile').files[0];

//     // Create new grid item
//     const newCard = document.createElement('div');
//     newCard.classList.add('template-card');
//     newCard.innerHTML = `
//       <div class="template-thumb">📦</div>
//       <div class="template-info">
//         <h3>${name}</h3>
//         <p>${keywords}</p>
//         <a href="#" class="download-link">Download</a>
//       </div>
//     `;

//     // Append to the grid
//     document.getElementById('template-grid').appendChild(newCard);

//     // Optional: clear form & close modal
//     document.getElementById('templateForm').reset();
//     document.getElementById('uploadModal').style.display = 'none';
// });


// document.addEventListener("DOMContentLoaded", function () {
//   document.getElementById("templateUploadForm").addEventListener("submit", function (e) {
//     e.preventDefault();

//     const name = document.getElementById('templateName').value;
//     const keywords = document.getElementById('templateKeywords').value;

//     const newCard = document.createElement('div');
//     newCard.innerHTML = `
//   <img src="template-placeholder.jpg" alt="${name}">
//   <h3>${name}</h3>
//   <p>${'No description provided.'}</p>
//   <div class="tags">
//     ${keywords.split(',').map(tag => `<span class="keyword">${tag.trim()}</span>`).join('')}
//   </div>
//   <button class="preview-btn" data-template="#">Preview</button>
//   <button class="download-btn" data-template="#">Download</button>
//   <p class="creator">Created by: You</p>
// `;

//     const grid = document.getElementById('template-grid');
//     const lastCard = grid.lastElementChild;
//     grid.insertBefore(newCard, lastCard)

//     document.getElementById('templateUploadForm').reset();
//     document.getElementById('uploadModal').style.display = 'none';
//   });
// });

// document.addEventListener("DOMContentLoaded", function () {
//   document.getElementById("templateUploadForm").addEventListener("submit", function (e) {
//     e.preventDefault();

//     const name = document.getElementById('templateName').value;
//     const keywords = document.getElementById('templateKeywords').value;

//     const newCard = document.createElement('div');
//     newCard.classList.add('template-card'); // <-- add class here

//     newCard.innerHTML = `
//       <img src="template-placeholder.jpg" alt="${name}">
//       <h3>${name}</h3>
//       <p>${'No description provided.'}</p>
//       <div class="tags">
//         ${keywords.split(',').map(tag => `<span class="keyword">${tag.trim()}</span>`).join('')}
//       </div>
//       <button class="preview-btn" data-template="#">Preview</button>
//       <button class="download-btn" data-template="#">Download</button>
//       <p class="creator">Created by: You</p>
//     `;

//     // const grid = document.getElementById('template-grid');
//     // // Append at the end instead of insertBefore lastCard
//     // grid.appendChild(newCard);

//     const grid = document.getElementById('template-grid');
//     const lastCard = grid.lastElementChild;
//     grid.insertBefore(newCard, grid.firstChild);

//     document.getElementById('templateUploadForm').reset();
//     document.getElementById('uploadModal').style.display = 'none';
//   });
// });


document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("templateUploadForm");

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const name = document.getElementById('templateName').value;
    const keywords = document.getElementById('templateKeywords').value;
    const description = document.getElementById('templateDescription').value || "No description provided.";

    const imageFile = document.getElementById('templateImage').files[0];
    const folderFiles = document.getElementById('templateFiles').files;

    if (!imageFile || folderFiles.length === 0) {
      alert("Please upload an image and a folder.");
      return;
    }

    const reader = new FileReader();
    reader.onload = function (e) {
      const imageSrc = e.target.result;

      const newCard = document.createElement('div');
      newCard.classList.add("template-card");
      newCard.setAttribute("data-tags", keywords);

      const firstFileName = folderFiles[0].webkitRelativePath.split('/')[0];
      const fakeZipName = firstFileName + '.zip';

      newCard.innerHTML = `
        <img src="${imageSrc}" alt="${name}">
        <span class="type-tag">Custom Template</span>
        <h3>${name}</h3>
        <p>${description}</p>
        <div class="tags">
          ${keywords.split(',').map(tag => `<span class="keyword">${tag.trim()}</span>`).join('')}
        </div>
        <button class="preview-btn" data-template="${fakeZipName}">Preview</button>
        <button class="download-btn" data-template="${fakeZipName}">Download</button>
        <p class="creator">Created by: You</p>
      `;

      const grid = document.getElementById('template-grid');
      const cards = grid.querySelectorAll(".template-card");
      const secondToLastCard = cards.length > 1 ? cards[cards.length - 1].previousElementSibling : null;

      if (secondToLastCard) {
        grid.insertBefore(newCard, secondToLastCard.nextSibling);
      } else {
        grid.appendChild(newCard);
      }

      form.reset();
      document.getElementById('uploadModal').style.display = 'none';
      document.body.style.overflow = '';
    };

    reader.readAsDataURL(imageFile);
  });
});


// download function
function download(url) {
  const a = document.createElement('a');
  a.href = url;
  a.download = url.split('/').pop();
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}



// for real estate
document.getElementById("preview1").onclick = () => {
  document.getElementById("mapModal1").style.display = "flex";
};
document.getElementById("closeMapBtn1").onclick = () => {
  document.getElementById("mapModal1").style.display = "none";
};
window.onclick = (event) => {
  if (event.target === document.getElementById("mapModal1")) {
    document.getElementById("mapModal1").style.display = "none";
  }
};

// for tour map
document.getElementById("preview2").onclick = () => {
  document.getElementById("mapModal2").style.display = "flex";
};
document.getElementById("closeMapBtn2").onclick = () => {
  document.getElementById("mapModal2").style.display = "none";
};
window.onclick = (event) => {
  if (event.target === document.getElementById("mapModal2")) {
    document.getElementById("mapModal2").style.display = "none";
  }
};


// for basic map
document.getElementById("preview5").onclick = () => {
  document.getElementById("mapModal5").style.display = "flex";
};
document.getElementById("closeMapBtn5").onclick = () => {
  document.getElementById("mapModal5").style.display = "none";
};
window.onclick = (event) => {
  if (event.target === document.getElementById("mapModal5")) {
    document.getElementById("mapModal5").style.display = "none";
  }
};


// function download(filename) {
//     console.log("Downloading:", filename);  // should appear in console
//     const link = document.createElement('a');
//     link.href = filename;
//     link.download = filename;
//     document.body.appendChild(link);
//     link.click();
//     document.body.removeChild(link);
//   }
