import React, { Component } from 'react'
import '@hi-ui/hiui/es/table/style/index.css'
import {
  Form,
  Input,
  Button,
  DatePicker,
  Counter,
  TimePicker,
  Select,
  Radio,
  Menu,
  Grid
} from '@hi-ui/hiui'
import './index.scss'
const FormItem = Form.Item

export default class Template extends Component {
  constructor (props) {
    super(props)
    this.state = {
      forms: this.initForms(),
      current: 0,
      activeMenuID: 0
    }
    this.singleList = [
      { title: '较长的一段描述文本', id: '2' },
      { title: '手机', id: '3' },
      { title: '笔记本', id: '4', disabled: true },
      { title: '生活周边', id: '5' },
      { title: '生态链', id: '6' }
    ]
    this.list = [
      {
        id: 0,
        content: '分类一'
      },
      {
        id: 1,
        content: '分类二'
      },
      {
        id: 2,
        content: '分类三'
      }
    ]
  }

  initForms () {
    return Object.assign(
      {},
      {
        text: '',
        Date: { start: new Date(), end: new Date() },
        num: 0,
        time: new Date(),
        select: '4',
        radio: '上海',
        longText: ''
      }
    )
  }

  handleChange () {}

  handleSubmit () {}

  reset () {}

  render () {
    const Row = Grid.Row
    const Col = Grid.Col
    const { forms, activeMenuID } = this.state
    console.log(activeMenuID)
    return (
      <div className='page--form-unfold-group'>
        <Form ref={this.form1} model={forms} rules={this.state.rules} labelWidth='90'>
          <h2 className='hi-form__title'>
            表单
            <div>
              <Button type='primary' onClick={this.handleSubmit.bind(this)}>
                提交
              </Button>
              <Button type='line' onClick={this.reset.bind(this)} style={{ marginLeft: '16px' }}>
                重置
              </Button>
            </div>
          </h2>

          <Row>
            <Col span={24}>
              <Menu
                placement='horizontal'
                activeId={activeMenuID}
                onClick={(id, prevId) => {
                  this.setState({
                    activeMenuID: id
                  })
                }}
                data={this.list}
              />
              <div className='page--form-unfold-group__menu-container'>
                {
                  activeMenuID === 0 && <div>
                    <fieldset>
                      <legend>基础信息</legend>

                      <FormItem label='名字' field='text'>
                        <Input
                          value={forms.text}
                          placeholder={'name'}
                          onChange={this.handleChange.bind(this, 'column1')}
                          style={{ width: '250px' }}
                        />
                      </FormItem>
                      <FormItem label='日期' field='Date'>
                        <DatePicker
                          type='daterange'
                          value={forms.Date}
                          onChange={d => {
                            console.log(d)
                          }}
                        />
                      </FormItem>
                      <FormItem label='数量' field='num'>
                        <Counter
                          defaultValue={forms.num}
                          step={1}
                          min={0}
                          max={8}
                          onChange={(e, val) => console.log('变化后的值：', val)}
                        />
                      </FormItem>
                      <FormItem label='时间' field='time'>
                        <TimePicker
                          value={forms.time}
                          onChange={d => {
                            console.log(d)
                          }}
                        />
                      </FormItem>
                    </fieldset>

                    <fieldset>
                      <legend>基础信息</legend>

                      <FormItem label='类别' field='select'>
                        <Select
                          data={this.singleList}
                          placeholder='请选择种类'
                          style={{ width: '200px' }}
                          value={forms.select}
                          onChange={item => {
                            console.log('单选结果', item)
                          }}
                        />
                      </FormItem>
                      <FormItem label='单选' field='radio'>
                        <Radio.Group
                          data={['北京', '上海', '重庆']}
                          value={forms.radio}
                          onChange={this.handleChange.bind(this, 'region', '')}
                        />
                      </FormItem>
                      <FormItem label='备注' field='longText'>
                        <Input
                          value={forms.longText}
                          placeholder={'多行文本'}
                          onChange={this.handleChange.bind(this, 'column1')}
                          style={{ width: '320px', height: '160px', resize: 'none' }}
                          type='textarea'
                        />
                      </FormItem>
                    </fieldset>
                  </div>
                }
                {activeMenuID === 1 && <div>1</div>}
                {activeMenuID === 2 && <div>2</div>}
              </div>
            </Col>
          </Row>
        </Form>
      </div>
    )
  }
}
