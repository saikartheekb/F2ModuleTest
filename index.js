var exampleModal = document.getElementById('exampleModal')
exampleModal.addEventListener('show.bs.modal', function (event) {
  var button = event.relatedTarget
  var recipient = button.getAttribute('data-bs-whatever')
  var modalTitle = exampleModal.querySelector('.modal-title')
  var modalBodyInput = exampleModal.querySelector('.modal-body input')
  modalTitle.textContent = 'Create A Post '
  modalBodyInput.value = recipient
})

const publishButton = document.querySelector('#publish-button')
const headingInput = document.querySelector('#heading-input')
const contentInput = document.querySelector('#content-input')

publishButton.addEventListener('click', () => {
  console.log('Publish button clicked')
  const heading = headingInput.value
  const content = contentInput.value
  const timestamp = new Date().toLocaleString()

  // Create post element
  const postElement = document.createElement('div')
  postElement.classList.add('post')

  // set id of the post based on the timestamp
  postElement.id = timestamp

  postElement.innerHTML = `
    <h2>${heading}</h2>
    <p class="content">${content}</p>
    <div class="post-footer">
      <button>Edit Post</button>
      <button>Delete Post</button>
      <p class="timestamp">Created at: ${timestamp}</p>
    </div>
  `
  // Append post element to page
  document.body.appendChild(postElement)

  //clear the data in the modal and close the modal
  headingInput.value = ''
  contentInput.value = ''
  const modal = bootstrap.Modal.getInstance(
    document.querySelector('#exampleModal'),
  )
  modal.hide()

  // Add event listeners to the edit and delete buttons
  let editButton = postElement.querySelector('button:first-of-type')
  let deleteButton = postElement.querySelector('button:last-of-type')
  editButton.setAttribute('data-bs-toggle', 'modal')
  editButton.setAttribute('data-bs-target', '#exampleEditModal')

  // edit button should open a new modal with the post data and is used to update the post
  editButton.addEventListener('click', () => {
    console.log('edit button is clicked')
    const heading = postElement.querySelector('h2').textContent
    const content = postElement.querySelector('p:first-of-type').textContent

    headingInput.value = heading
    contentInput.value = content

    const updateButton = document.querySelector('#update-button')

    const editedHeadingInput = document.querySelector('#edit-heading-input')
    editedHeadingInput.value = heading
    // console.log("Heading: ", heading)
    // console.log("Heading.inputval:", editedHeadingInput.value);

    const editedContentInput = document.querySelector('#edit-content-input')
    editedContentInput.value = content
    // console.log("Content: ", content);
    // console.log("Content.inputval: ", editedContentInput.value);

    const editModal = bootstrap.Modal.getInstance(
      document.querySelector('#exampleEditModal'),
    )
    editModal.show()
    // we do the edits in the inputboxes after edit modal is shown

    updateButton.addEventListener('click', () => {
      console.log('update button is clicked');
      // let editedPostElement = document.createElement('div');
      // editedPostElement.querySelector('h2').textContent = editedHeadingInput.value
      const editedHeading = editedHeadingInput.value
      console.log(editedHeadingInput.value);

      const editedContent = editedContentInput.value;
      console.log(editedContentInput.value);

      console.log('post is edited')

      // editedPostElement.classList.add('post')

      // set id of the post based on the timestamp
      editedTimestamp = new Date().toLocaleString()
      postElement.id = editedTimestamp

      postElement.querySelector('h2').textContent = editedHeading;
      postElement.querySelector('.content').textContent = editedContent;
      postElement.querySelector('.timestamp').textContent = `Updated at: ${editedTimestamp}`;

      editedHeadingInput.value = ''
      editedContentInput.value = ''
      
      const editModal = bootstrap.Modal.getInstance(
        document.querySelector('#exampleEditModal'),
      )
      editModal.hide();
    })
  });

  // delete button should remove the original post or edited post from the page
  deleteButton.addEventListener('click', () => {
    postElement.remove();
  });
});