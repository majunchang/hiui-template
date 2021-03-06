import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Button, Input, DatePicker, Select, Icon, Grid } from '@hi-ui/hiui'
import { DataFilter, FieldGroup, Field } from '@hi-ui/component-kit/es/data-filter'
import './index.scss'

export default class Template extends Component {
  constructor (props) {
    super(props)

    this.orderPlatformOptions = [
      { title: '全部', id: '全部' },
      { title: '小米商城', id: '小米商城' },
      { title: '小米之家', id: '小米之家' },
      { title: '天猫旗舰店', id: '天猫旗舰店' },
      { title: '京东旗舰店', id: '京东旗舰店' }
    ]
    this.orderDeliveryOptions = [
      { title: '全部', id: '全部' },
      { title: '顺丰', id: '顺丰' },
      { title: 'EMS', id: 'EMS' },
      { title: '如风达', id: '如风达' },
      { title: '百世汇通', id: '百世汇通' },
      { title: '自取', id: '自取' }
    ]
    this.orderPaymentOptions = [
      { title: '全部', id: '全部' },
      { title: '微信支付', id: '微信支付' },
      { title: '支付宝', id: '支付宝' },
      { title: '银联', id: '银联' },
      { title: '信用卡', id: '信用卡' },
      { title: '现金', id: '现金' }
    ]
    this.orderStatusOptions = [
      { title: '全部', id: '全部' },
      { title: '待支付', id: '待支付' },
      { title: '已支付', id: '已支付' },
      { title: '配货中', id: '配货中' },
      { title: '配送中', id: '配送中' },
      { title: '已收货', id: '已收货' },
      { title: '已取消', id: '已取消' },
      { title: '已关闭', id: '已关闭' }
    ]
    this.columnMixins = {
      id: {
        sorter (pre, next) {
          return pre.id - next.id
        }
      },
      action: {
        render: () => (
          <React.Fragment>
            <Icon name='edit' />
            <Icon name='close' />
            <Icon name='more' />
          </React.Fragment>
        )
      }
    }

    this.state = {
      pageSize: 10,
      total: 0,
      page: 1,
      tableDatas: [],
      columns: [],
      forms: this.initForms(),
      _date: new Date()
    }
  }

  updateForm (data, callback = undefined) {
    const forms = Object.assign({}, this.state.forms, data)

    this.setState(
      {
        forms
      },
      () => {
        callback && callback()
      }
    )
  }

  initForms () {
    return Object.assign(
      {},
      {
        order_id: '',
        order_platform: '全部',
        order_delivery: '全部',
        order_payment: '全部',
        order_date: new Date()
      }
    )
  }

  beforeSubmit () {
    return true
  }

  render () {
    const Row = Grid.Row
    const Col = Grid.Col
    const { forms, pageSize } = this.state
    const params = {
      pageSize
    }

    return (
      <div className='page--query-basic'>
        <Row>
          <Col span={24}>
            <DataFilter
              url={`http://yapi.demo.qunar.com/mock/26534/hiui/base-table`}
              onFetched={ret => {
                console.log('fetchData', ret)
              }}
              params={params}
              columnMixins={this.columnMixins}
              actions={[
                'search',
                <Link to='/form-unfold-group' className='hi-tpl__add'>
                  <Button type='primary' icon='plus' />
                </Link>,
                <Button
                  type='line'
                  icon='download'
                  onClick={() => {
                    console.log('click download')
                  }}
                />,
                <Button
                  type='line'
                  icon='mark'
                  onClick={() => {
                    console.log('click share')
                  }}
                />,
                <Button
                  type='line'
                  icon='more'
                  onClick={() => {
                    console.log('click more')
                  }}
                />
              ]}
              activeTools={['query']}
              tools={[
                {
                  type: 'query',
                  forms,
                  beforeSubmit: this.beforeSubmit.bind(this),
                  onCancel: () => {
                    this.updateForm(this.initForms())
                  }
                }
              ]}
            >
              <FieldGroup main>
                <Field label='订单号' width='220'>
                  <Input
                    placeholder='请输入'
                    value={forms.order_id}
                    onChange={(e, value) => {
                      this.updateForm({ order_id: value })
                    }}
                  />
                </Field>
                <Field label='订单日期' width='200'>
                  <DatePicker
                    value={forms.order_date}
                    onChange={d => {
                      this.updateForm({ order_date: DatePicker.format(d, 'YYYY-MM-DD') })
                    }}
                  />
                </Field>
                <Field label='业务来源' width='200'>
                  <Select
                    data={this.orderPlatformOptions}
                    placeholder='请选择业务来源'
                    value={forms.order_platform}
                    onChange={value =>
                      this.updateForm({ order_platform: (value[0] && value[0].id) || '全部' })
                    }
                  />
                </Field>
                <Field label='运输方式' width='200'>
                  <Select
                    data={this.orderDeliveryOptions}
                    placeholder='请选择运输方式'
                    value={forms.order_delivery}
                    onChange={value =>
                      this.updateForm({ order_delivery: (value[0] && value[0].id) || '全部' })
                    }
                  />
                </Field>
                <Field label='支付方式' width='200' advanced>
                  <Select
                    data={this.orderPaymentOptions}
                    placeholder='请选择支付方式'
                    value={forms.order_payment}
                    onChange={value =>
                      this.updateForm({ order_payment: (value[0] && value[0].id) || '全部' })
                    }
                  />
                </Field>
                <Field label='订单状态' width='200' advanced>
                  <Select
                    data={this.orderStatusOptions}
                    placeholder='请选择订单状态'
                    value={forms.order_status}
                    onChange={value =>
                      this.updateForm({ order_status: (value[0] && value[0].id) || '全部' })
                    }
                  />
                </Field>
              </FieldGroup>
            </DataFilter>
          </Col>
        </Row>
      </div>
    )
  }
}
