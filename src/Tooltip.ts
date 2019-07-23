import PositionBlock from './positionPlaceholder'

export default class Tooltip {
  private tooltip: HTMLDivElement
  private input: HTMLInputElement
  private currentPositionBlock: PositionBlock

  constructor(quill, template) {
    const tooltip = this.tooltip = quill.addContainer('ql-tooltip')
    tooltip.classList.add('ql-hidden', 'ql-position-placeholder-tooltip')
    tooltip.setAttribute('data-mode', 'position-placeholder')
    tooltip.innerHTML = template
    const input = this.input = tooltip.querySelector('input')
    const button = tooltip.querySelector('.ql-action')
    button.addEventListener('click', () => {
      const height = +(input.value).replace('%', '')
      if (height >= 0) {
        this.currentPositionBlock.format('height', height + '%')
        this.hide()
      }
    })
    quill.root.addEventListener('click', this.hide.bind(this))
  }

  setPosition(bounds) {
    this.tooltip.style.left = bounds.left + 'px'
    this.tooltip.style.top = bounds.top + 'px'
  }

  show(bounds, currentPositionBlock, value) {
    if (value >= 0) {
      this.input.value = value
    }
    this.currentPositionBlock = currentPositionBlock
    this.setPosition(bounds)
    this.tooltip.classList.remove('ql-hidden')
  }

  hide() {
    this.input.value = ''
    this.tooltip.classList.add('ql-hidden')
  }
}
