import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import {
  Table,
  Input,
  Form,
  Button,
  Modal
} from '@hi-ui/hiui/es'
import { observer, inject } from 'mobx-react'
import {
  pageSize
} from '../../config'
import AddModal from './addModal'
import EditModal from './editModal'
const FormItem = Form.Item

@inject('friend')
@observer
class Template extends Component {
  constructor (props) {
    super(props)
    const {
      friend: store
    } = props
    this.columns = [
      { dataIndex: 'name', title: '姓名' },
      { dataIndex: 'age', title: '年龄' },
      { dataIndex: 'sex', title: '性别' },
      { dataIndex: 'id',
        title: '操作',
        render (id) {
          return (
            <React.Fragment>
              <Button
                type='primary'
                onClick={() => {
                  store.currentId = id
                  store.UI.showEditModal = true
                }}
              >编辑</Button>
              <Button
                type='danger'
                onClick={() => {
                  store.currentId = id
                  store.UI.showDelConfirmModal = true
                }}
              >删除</Button>
            </React.Fragment>
          )
        }
      }
    ]
  }

  render () {
    const {
      friend: store
    } = this.props
    console.log(store, 'store')
    return (
      <div className='page page--gutter'>
        <Form inline>
          <FormItem>
            <Input
              placeholder='姓名'
              value={store.filter.name}
              onChange={(e) => (store.filter.name = e.target.value)}
              append={() => <Button>查询</Button>}
            />
          </FormItem>
          <FormItem >
            <Button onClick={() => {
              store.UI.showAddModal = true
            }}>增加</Button>
          </FormItem>
        </Form>

        <Modal show={store.UI.showDelConfirmModal}>
          确认删除吗
        </Modal>
        <AddModal />
        <EditModal />

        <Table columns={this.columns} data={store.list} />
      </div>
    )
  }

  componentDidMount () {
    const {
      friend: store
    } = this.props
    store.fetch()
  }
}

export default Template