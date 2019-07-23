import Quill, {RangeStatic} from 'quill'
import positionBlock from './positionPlaceholder'
import './index.scss'
import Tooltip from './Tooltip'

const Module = Quill.import('core/module')
const DEFAULT = {
  icon: '<svg class="icon" style="vertical-align: middle;fill: currentColor;overflow: hidden;" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"><path d="M226.72571416 962C213.86857168 962 203.42857168 948.06285752 203.42857168 930.73142832c0-17.58857168 10.46571416-31.73142832 23.29714248-31.73142832h556.97142832c12.80571416 0 23.27142832 14.14285752 23.27142919 31.73142832 0 17.33142833-10.46571416 31.26857168-23.29714335 31.26857168H226.7z m0-837C213.86857168 125 203.42857168 110.62571416 203.42857168 93.73142833 203.42857168 75.93714248 213.89428584 62 226.72571416 62h556.97142832c12.80571416 0 23.27142832 13.93714248 23.27142919 31.73142832 0 16.89428584-10.46571416 31.26857168-23.29714335 31.26857168H226.7z m245.82857168 107.74285752L431.25714248 273.70571416a25.86857168 25.86857168 0 0 1-36.51428496 0 26.64 26.64 0 0 1 0-37.18285664l85.9885708-85.06285752a24.94285752 24.94285752 0 0 1 36.25714336 0l1.87714248 1.26 83.18571416 83.82857167a25.53428584 25.53428584 0 0 1 0.61714335 37.15714249 26.22857168 26.22857168 0 0 1-36.84857167 0L524.85714248 232.74285752v557.38285664l40.96285752-40.96285664a25.68857168 25.68857168 0 0 1 36.84857168 0 25.17428584 25.17428584 0 0 1-0.61714336 36.87428496l-83.18571416 83.49428584-1.90285664 1.54285752a25.48285752 25.48285752 0 0 1-36.2314292 0L394.74285752 786.06285752a26.22857168 26.22857168 0 0 1 0-36.87428585 25.30285752 25.30285752 0 0 1 36.54 0l41.29714248 40.62857081V232.74285752z"></path></svg>',
  tooltipTemplate: `<input type="text" placeholder="相对于图片高度的百分比"><a class="ql-action"></a>`
}

interface options {
  icon: string,
  tooltipTemplate: string
}

class PositionPlaceholder extends Module {
  private tooltip: Tooltip
  private options: options
  private quill: Quill
  private toolbar: any

  constructor(quill, options) {
    super(quill, options)
    this.options = Object.assign({}, DEFAULT, this.options)
    this.quill = quill
    this.toolbar = quill.getModule('toolbar')
    this.toolbar.addHandler('position-placeholder', this.positionBlockHandler.bind(this))
    const positionPlaceholderToolbar = document.querySelector('.ql-position-placeholder')
    positionPlaceholderToolbar.innerHTML = this.options.icon
    this.tooltip = new Tooltip(this.quill, DEFAULT.tooltipTemplate)
    this.initPositionBlock()
    this.createStyle()
  }

  createStyle() {
    const style = document.createElement('style')
    let head = document.querySelector('head')
    if (!head) {
      head = document.createElement('head')
      document.appendChild(head)
    }
    style.type = 'text/css'
    style.innerHTML = `.ql-snow .quill-position-placeholder { background-image: url('data:image/svg+xml;utf8,${encodeURIComponent(this.options.icon)}'); }`
    head.appendChild(style)
  }

  initPositionBlock() {
    positionBlock.tooltip = this.tooltip
    positionBlock.value = (domNode) => {
      const style = domNode.style
      return {quill: this.quill, style}
    }
  }

  positionBlockHandler() {
    const getSelection: RangeStatic = this.quill.getSelection() || {index: 0, length: 0}
    let selection = getSelection.index
    this.quill.insertEmbed(selection, 'position-placeholder', {quill: this.quill}, 'user')
  }
}

Quill.register(positionBlock)
Quill.register('modules/positionPlaceholder', PositionPlaceholder)

export default PositionPlaceholder
