var exampleModal = document.getElementById('exampleModal')
exampleModal.addEventListener('show.bs.modal', function (event) {
  var button = event.relatedTarget
  var recipient = button.getAttribute('data-bs-whatever')
  var modalTitle = exampleModal.querySelector('.modal-title')
  var modalBodyInput = exampleModal.querySelector('.modal-body input')
  modalTitle.textContent = 'Create A Post '
  modalBodyInput.value = recipient
})

const publishButton = document.querySelector('#publish-button');
const headingInput = document.querySelector('#heading-input');
const contentInput = document.querySelector('#content-input');

publishButton.addEventListener('click', () => {
  console.log('Publish button clicked');
  const heading = headingInput.value;
  const content = contentInput.value;
  const timestamp = new Date().toLocaleString();

  // Create post element
  const postElement = document.createElement('div');
  postElement.classList.add('post');

  // set id of the post based on the timestamp
  postElement.id = timestamp;

  postElement.innerHTML = `
    <h2>${heading}</h2>
    <p>${content}</p>
    <div class="post-footer">
    <button>Edit Post</button>
    <button>Delete Post</button>
    <p class="timestamp">Published: ${timestamp}</p>
    </div>
  `;
  // Append post element to page
  document.body.appendChild(postElement);

  //clear the data in the modal and close the modal
  headingInput.value = '';
  contentInput.value = '';
  const modal = bootstrap.Modal.getInstance(document.querySelector('#exampleModal'));
  modal.hide();

  // Add event listeners to the edit and delete buttons
  const editButton = postElement.querySelector('button:first-of-type');
  const deleteButton = postElement.querySelector('button:last-of-type');

  // edit button should open a new modal with the post data and is used to update the post
  editButton.addEventListener('click', () => {
    const heading = postElement.querySelector('h2').textContent;
    const content = postElement.querySelector('p:first-of-type').textContent;
    headingInput.value = heading;
    contentInput.value = content;
    const modal = bootstrap.Modal.getInstance(document.querySelector('#exampleModal'));
    modal.show();
    publishButton.addEventListener('click', () => {
      postElement.querySelector('h2').textContent = headingInput.value;
      postElement.querySelector('p:first-of-type').textContent = contentInput.value;
      console.log('post is edited')
      postElement.querySelector('p:last-of-type').textContent = `Edited: ${new Date().toLocaleString()}`;
      headingInput.value = '';
      contentInput.value = '';
      const modal = bootstrap.Modal.getInstance(document.querySelector('#exampleModal'));
      modal.hide();

      // delete the previous post
      postElement.remove();
    });
  });

  // delete button should remove the post from the page
  deleteButton.addEventListener('click', () => {
    postElement.remove();
  }
  );
});

