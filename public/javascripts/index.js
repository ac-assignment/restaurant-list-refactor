const sortSelect = document.querySelector('select#sort')
const keywordInput = document.querySelector('form#search [name="keyword"]')
const lastKeyword = keywordInput.value
// 選單切換時即送出搜尋(使用上次keyword)
sortSelect.addEventListener('change', function() {
  keywordInput.value = lastKeyword
  document.querySelector('form#search').submit()
})

// 刪除按鈕
const formList = document.querySelectorAll('form.delete')
formList.forEach((ele) => {
  ele.addEventListener('submit', function(event) {
    event.preventDefault()
    event.stopPropagation()
    const isConfirm = confirm('確定刪除?')
    if (isConfirm) {
      this.submit()
    }
  })
})