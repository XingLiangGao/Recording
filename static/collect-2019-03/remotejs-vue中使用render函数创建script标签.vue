<template>
  <remote-js :src="url" @load-js-finish="load"></remote-js>
</template>

<script>
  export default {
    props: {
      /*
      * @property {string} url 需要加载的外部URL
      * @property {function} load 外部js加载完成回调
      * */
      url: {
        type: String,
        required: true
      },
      load: Function
    },
    components: {
      'remote-js': {
        render (createElement) {
          var $that = this
          return createElement('script', {
            attrs: {
              type: 'text/javascript',
              src: this.src
            },
            on: {
              load () {
                $that.$emit('load-js-finish')
              }
            }
          })
        },
        props: {
          src: {
            type: String,
            required: true
          }
        }
      }
    }
  }
</script>
