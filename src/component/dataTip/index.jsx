import React, { useState } from 'react'
import Modal from '@hi-ui/hiui/es/modal'

const DataTip = () => {
  const isShow = window.localStorage.getItem('__showt')
  const [show, setShow] = useState(true)
  console.log('show', show)
  return (
    !isShow &&
    <Modal
      title='温馨提示'
      show={show}
      cancelText='知道了'
      confirmText='不再提醒'
      onCancel={() => {
        setShow(false)
      }}
      onConfirm={() => {
        console.log(11)
        setShow(false)
        window.localStorage.setItem('__showt', true)
      }}
    >
      <div style={{ textAlign: 'center' }}>
        <p>由于使用了第三方在线 Mock 服务（仅支持 Http 请求协议）如果数据不能正确加载，请尝试点击浏览器地址栏盾牌按钮，选择「允许加载不安全脚本」</p>
        <img src='/hiui-template/static/tips.gif' alt='tips' style={{ border: '1px solid #ccc' }} />
      </div>
    </Modal>
  )
}

export default DataTip
