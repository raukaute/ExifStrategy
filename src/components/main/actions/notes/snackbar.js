
import { VSnackbar, VBtn, VIcon } from 'vuetify/lib';
import { numbers, unchanged, reason } from '@/util/formatReport.js';

export default {
  functional: true,
   props: {
     message: {
       type: String,
     },
    show: {
      type: Boolean,
      default: true
     },
  },

  render: function(h, {props, listeners}) {
    return h(
      VSnackbar,
        {
          props: {
            value: true,
            timeout: 0,
            color: '#fff',
            top: true
          }
        },
        [
          h('div',
          {
            class: ['black--text'],
            style: {
              maxWidth:  '380px'
            },
          },
            [
              numbers(props.message, h),
              unchanged(props.message, h),
              reason(props.message, h)
            ]
          ),
          h(VBtn,
          {
            props: {
              icon: true,
            },
            on: {
              click: listeners.close
            }
          },
          [
            h(VIcon,
            {
              props:{ color: '#424242' },
            }, "mdi-close")
          ])
        ]
    )
  }
}
