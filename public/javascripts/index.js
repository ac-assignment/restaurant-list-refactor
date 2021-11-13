const deleteFormList = document.querySelectorAll('.delete')
deleteFormList.forEach((ele) => {
  ele.addEventListener('submit', function(event) {
    event.preventDefault()
    event.stopPropagation()
    const isConfirm = confirm('確定刪除?')
    if (isConfirm) {
      this.submit()
    }
  })
})