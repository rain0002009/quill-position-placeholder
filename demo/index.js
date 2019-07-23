const options = {
    modules: {
        toolbar: {
            container: [
                ['bold', 'italic', 'underline', 'strike'],
                ['position-placeholder']
            ]
        },
        positionPlaceholder: {}
    },
    theme: 'snow'
}
const editor = new Quill('#editor', options)
editor.on('editor-change', function () {
    console.log(editor.getText())
})
