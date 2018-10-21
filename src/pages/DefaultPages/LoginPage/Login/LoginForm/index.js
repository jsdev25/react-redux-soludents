import React from 'react'
import { connect } from 'react-redux'
import { REDUCER, submit } from 'ducks/login'
import { Form, Input, Button,Checkbox, Icon ,Row, Col} from 'antd'

const FormItem = Form.Item

const mapStateToProps = (state, props) => ({
  isSubmitForm: state.app.submitForms[REDUCER],
})

@connect(mapStateToProps)
@Form.create()
class LoginForm extends React.Component {

  state = {
    hidden:false,
    confirmDirty: false,
  }

  static defaultProps = {}

  // $FlowFixMe
  onSubmit = (isSubmitForm: ?boolean) => event => {
    event.preventDefault()
    const { form, dispatch } = this.props
    if (!isSubmitForm) {
      form.validateFields((error, values) => {
        if (!error) {
          dispatch(submit(values))
        }
      })
    }
  }

  _handleClick(){
    this.setState({
      hidden:!this.state.hidden
    })
  }

  handleConfirmBlur = e => {
    const value = e.target.value
    this.setState({ confirmDirty: this.state.confirmDirty || !!value })
  }

  handleSubmit = e => {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values)
      }
    })
  }

  compareToFirstPassword = (rule, value, callback) => {
    const form = this.props.form
    if (value && value !== form.getFieldValue('password')) {
      callback('Two passwords that you enter is inconsistent!')
    } else {
      callback()
    }
  }

  validateToNextPassword = (rule, value, callback) => {
    const form = this.props.form
    if (value && this.state.confirmDirty) {
      form.validateFields(['confirm'], { force: true })
    }
    callback()
  }

  render() {
    const { form, isSubmitForm } = this.props

    return (
      <div className="cat__pages__login__block__form">
        <h4 className="text-uppercase">
        { this.state.hidden
          ? <strong>Register</strong>
          : <strong>Log In</strong>
        }
        </h4>
        <br />

      { this.state.hidden
        ?   <Form onSubmit={this.handleSubmit} className="login-form">
        <Row gutter={24}>
          <Col xs={12}>
            <FormItem validateStatus="validating">
              {form.getFieldDecorator('Firstname', {
                rules: [{ required: true, message: 'Please input your Firstname!' }],
              })(
                <Input
                  prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  placeholder="Firstname"
                />,
              )}
            </FormItem>
          </Col>

          <Col xs={12}>
            <FormItem validateStatus="validating">
              {form.getFieldDecorator('Lastname', {
                rules: [{ required: true, message: 'Please input your Lastname!' }],
              })(
                <Input
                  prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  placeholder="Last Name"
                />,
              )}
            </FormItem>
          </Col>

          <Col xs={12}>
              <FormItem>
              {form.getFieldDecorator('passwords', {
               //{form.getFieldDecorator('password', {

                rules: [
                  {
                    required: true,
                  },
                  {
                    validator: this.validateToNextPassword,
                  },
                ],
              })(
                <Input
                  prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  type="password"
                  placeholder="Input your password"
                />,
              )}
            </FormItem>
          </Col>

          <Col xs={12}>
              <FormItem>
              {form.getFieldDecorator('confirm', {
                rules: [
                  {
                    required: true,
                  },
                  {
                    validator: this.compareToFirstPassword,
                  },
                ],
              })(
                <Input
                  type="password"
                  onBlur={this.handleConfirmBlur}
                  placeholder="Confirm password"
                />,
              )}
            </FormItem>
          </Col>

          <Col xs={12}>
              <FormItem validateStatus="validating">
              {form.getFieldDecorator('Phone', {
                rules: [{ required: true, message: 'Please input your Phone!' }],
              })(
                <Input
                  prefix={<Icon type="phone" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  placeholder="Phone"
                />,
              )}
            </FormItem>
          </Col>

          <Col xs={12}>
              <FormItem validateStatus="validating">
              {form.getFieldDecorator('Adli Number', {
                rules: [{ required: true, message: 'Please input Number!' }],
              })(
                <Input
                  prefix={<Icon type="phone" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  placeholder="Adli Number"
                />,
              )}
            </FormItem>

          </Col>

          <Col xs={12}>
              
            <FormItem validateStatus="validating">
              {form.getFieldDecorator('E-mail', {
                rules: [{ required: true, message: 'Please input your E-mail!' }],
              })(
                <Input
                  prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  placeholder="E-mail"
                />,
              )}
            </FormItem>
          </Col>
         
          <Col xs={12}>
              <FormItem validateStatus="validating">
              {form.getFieldDecorator('Address', {
                rules: [{ required: true, message: 'Please input your Address!' }],
              })(
                <Input
                  prefix={<Icon type="home" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  placeholder="Address"
                />,
              )}
            </FormItem>
          </Col>
            
        </Row>

          <span className="ml-3">
            {form.getFieldDecorator('mailsubscription', {
              valuePropName: 'checked',
              initialValue: true,
            })(<Checkbox>Terms and Conditions</Checkbox>)}
          </span>

         <div className="form-actions">

          <Button htmlType="submit" className="width-150 login-form-button" style={{backgroundColor:'#00d563',color:'#fff',height:45}}>
            Register
          </Button>   

           <Button className="width-150 ml-4" onClick={this._handleClick.bind(this)} style={{backgroundColor:'#ce2828',color:'#fff',height:45}}>
            Cancel
          </Button>
            
        </div>
      </Form>

       : <Form layout="vertical" hideRequiredMark onSubmit={this.onSubmit(isSubmitForm)}>
          <FormItem label="Username">
            {form.getFieldDecorator('username', {
              initialValue: 'admin@mediatec.org',
              rules: [
                { type: 'email', message: 'The input is not a valid e-mail address' },
                { required: true, message: 'Please input your e-mail address' },
              ],
            })(<Input size="default" />)}
          </FormItem>
          <FormItem label="Password">
            {form.getFieldDecorator('password', {
              initialValue: '123123',
              rules: [{ required: true, message: 'Please input your password' }],
            })(<Input size="default" type="password" />)}
          </FormItem>
            <FormItem>
            {form.getFieldDecorator('remember', {
              valuePropName: 'checked',
              initialValue: true,
            })(<Checkbox>Keep me signed in</Checkbox>)}
            {/* <a
              className="login-form-forgot pull-right text-primary"
              href="javascript: void(0);"
            >
              Forgot password?
            </a> */}
          </FormItem>
          <div className="form-actions">
            <Button
              style={{backgroundColor:'#00d563',color:'#fff',height:45}}
              className="width-150 mr-4"
              htmlType="submit"
              loading={isSubmitForm}
            >
              LOGIN
            </Button>
            <Button className="width-150" style={{backgroundColor:'#00d563',color:'#fff',height:45}} htmlType="button" onClick={this._handleClick.bind(this)}>
              CREATE ACCOUNT
            </Button>
          </div>
        </Form>
        }
      </div>
    )
  }
}

export default LoginForm
