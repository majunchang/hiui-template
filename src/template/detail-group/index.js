import React, { Component } from 'react'
import '@hi-ui/hiui/es/table/style/index.css'
import Button from '@hi-ui/hiui/es/button'
import NavMenu from '@hi-ui/hiui/es/nav-menu'
import Loading from '@hi-ui/hiui/es/loading'
import Icon from '@hi-ui/hiui/es/icon'
import Table from '@hi-ui/hiui/es/table'
import Grid from '@hi-ui/hiui/es/grid'
import './index.scss'
import axios from 'axios'

export default class Template extends Component {
  state = {
    activeNavMenuIndex: 0,
    title: '小米8屏幕指纹版',
    desc: Array(3).fill({
      key: '状态',
      value: '已借出'
    }),
    baseInfo: {},
    expressInfo: [],
    carInfo: {},
    productInfo: {}
  }

  fetchBaseInfo = () => {
    return axios
      .get(
        'https://easy-mock.com/mock/5cff0b81700fad38e151c566/usual/detailinfo'
      )
      .then(({ data: { data: baseInfo } }) => {
        this.setState({ baseInfo })
      })
  }

  fetchExpressInfo = () => {
    return Promise.all([
      axios.get(
        'https://easy-mock.com/mock/5cff0b81700fad38e151c566/usual/userinfo'
      ),
      axios.get(
        'https://easy-mock.com/mock/5cff0b81700fad38e151c566/usual/userinfo'
      )
    ]).then(([{ data: { data: data1 } }, { data: { data: data2 } }]) => {
      this.setState({
        expressInfo: [
          { ...data1, title: '发件人信息' },
          { ...data2, title: '收件人信息' }
        ]
      })
    })
  }

  fetchCarInfo = () => {
    return axios
      .get(
        'https://easy-mock.com/mock/5c1b42e3fe5907404e6540e9/hiui/table/get-datas'
      )
      .then(({ data: { data: carInfo } }) => {
        this.setState({ carInfo })
      })
  }

  fetchProductInfo = () => {
    return axios
      .get(
        'https://easy-mock.com/mock/5c1b42e3fe5907404e6540e9/hiui/table/get-datas'
      )
      .then(({ data: { data: productInfo } }) => {
        this.setState({ productInfo })
      })
  }

  handleBackClick = () => {}
  handleDeleteClick = () => {}
  handleEditClick = () => {}
  handleMoreClick = () => {}

  async componentDidMount () {
    const closure = Loading.open()
    try {
      await this.fetchBaseInfo()
      await this.fetchExpressInfo()
      await this.fetchCarInfo()
      await this.fetchProductInfo()
    } finally {
      closure.close()
    }
  }

  render () {
    const Row = Grid.Row
    const Col = Grid.Col
    const { title, baseInfo, expressInfo, carInfo, productInfo } = this.state
    const { activeNavMenuIndex } = this.state
    const ani = Number.parseInt(activeNavMenuIndex)
    return (
      <Col className='detail-group'>
        <Col className='detail-group__header'>
          <Row className='row row-01' align='center'>
            <span onClick={this.handleBackClick}>
              <Icon name='left' />
              <span>返回</span>
            </span>
            <span className='spacer'>|</span>
            <span>详情</span>
          </Row>
          <Row className='row row-02' justify='space-between'>
            <Col>
              <h3>{title}</h3>
            </Col>
            <Col>
              <Button icon='edit' type='primary' onClick={this.handleEditClick}>
                编辑
              </Button>
              <Button
                icon='delete'
                type='danger'
                onClick={this.handleDeleteClick}
              >
                删除
              </Button>
              <Button icon='more' type='line' onClick={this.handleMoreClick} />
            </Col>
          </Row>
        </Col>
        <Col className='detail-group__card detail-group__card--base page page--gutter'>
          <Row className='title'>基础信息</Row>
          <ul>
            {Object.values(baseInfo).map(({ key, value }, idx) => (
              <li key={idx}>
                <div>{key}</div>
                <div>{value}</div>
              </li>
            ))}
          </ul>
        </Col>
        <Col className='detail-group__card detail-group__card--express page page--gutter'>
          <Row className='title'>收发信息</Row>
          <ul className='card-list'>
            {expressInfo.map(({ title, avatar, ...info }, idx) => (
              <li className='card-item' key={idx}>
                <Row className='row row-01'>{title}</Row>
                <Row className='row row-02'>
                  <img src={avatar.value} />
                  <ul>
                    {Object.values(info).map(({ key, value }, idx) => (
                      <li key={idx}>
                        <div>{key}</div>
                        <div>{value}</div>
                      </li>
                    ))}
                  </ul>
                </Row>
              </li>
            ))}
          </ul>
        </Col>
        <Col className='detail-group__card page page--gutter'>
          <NavMenu
            data={[{ title: '车辆信息' }, { title: '商品信息' }]}
            onClick={(_, idx) => {
              this.setState({
                activeNavMenuIndex: idx
              })
            }}
          />
          {ani === 0 && <Table {...carInfo} />}
          {ani === 1 && <Table {...productInfo} />}
          <ul />
        </Col>
      </Col>
    )
  }
}
