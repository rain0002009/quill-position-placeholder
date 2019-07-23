import Quill from 'quill'

const BlockEmbed = Quill.import('blots/block/embed')

class PositionBlock extends BlockEmbed {
  private quill: Quill
  static blotName: string
  static tagName: string
  static className: string
  static tooltip: any
  private domNode: any

  constructor(node, value) {
    super(node, value)
    this.quill = value.quill
    value.style && node.setAttribute('style', value.style.cssText)
    node.addEventListener('click', this.handleClick.bind(this))
  }

  static create() {
    const parentNode = super.create()
    parentNode.setAttribute('contenteditable', false)
    parentNode.innerHTML = '<br>'
    return parentNode
  }

  static formats(node) {
    const format = {
      style: '',
      data: {}
    }
    if (node.hasAttribute('style')) {
      format.style = node.getAttribute('style')
    }
    if (node.dataset.value) {
      format.data = node.dataset.value
    }
    return format
  }

  handleClick(e) {
    e.stopPropagation()
    const style = this.value()['position-placeholder'].style || {}
    const value = (style.height || '').replace('%', '')
    const bounds = this.quill.getBounds(this.quill.getIndex(this))
    PositionBlock.tooltip.show(bounds, this, value)
  }

  format(name, value) {
    this.domNode.style[name] = value
    this.domNode.dataset.value = value
  }
}

PositionBlock.blotName = 'position-placeholder'
PositionBlock.tagName = 'div'
PositionBlock.className = 'quill-position-placeholder'
export default PositionBlock
