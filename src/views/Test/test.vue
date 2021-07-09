<template>
  <div>
      <iPage
      class="page-box"
      ></iPage>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import iView from 'iview'
import 'iview/dist/styles/iview.css'
Vue.use(iView)
import iPage from '@/components/iPage/page.vue'
import Book from './test'
export default Vue.extend({
  created() {
    this.init();
  },
  components: {
    iPage
  },
  data() {
    return {
      test:'abc',
      columns: [
        {
          dataIndex: "name",
          key: "name",
          slots: { title: "customTitle" },
        },
        {
          dataIndex: "age",
          key: "age",
          slots: { title: "customTitle" },
        },
        {
          dataIndex: "address",
          key: "address",
          slots: { title: "customTitle" },
        },
         {
          dataIndex: "tags",
          key: "tags",
          slots: { title: "customTitle" },
        },
      ],
      data: [
        {
          key: "1",
          name: "John Brown",
          age: 32,
          address: "New York No. 1 Lake Park",
          tags: ["nice", "developer"],
        },
        {
          key: "2",
          name: "Jim Green",
          age: 42,
          address: "London No. 1 Lake Park",
          tags: ["loser"],
        },
        {
          key: "3",
          name: "Joe Black",
          age: 32,
          address: "Sidney No. 1 Lake Park",
          tags: ["cool", "teacher"],
        },
      ],
    };
  },
  methods: {
    async init() {
      let book = new Book()
      await book.getBookData()
    },
    executeCustomCell(record,index){
      return {
        on: {
          dblclick: () => {
            console.log(JSON.stringify(record) + "---" + index)
            this.copyText(record.name)
            this.$message.success('复制成功')
          },
        }
      }
    },
    copyText (content) {
      var oInput = document.createElement('textarea')
      oInput.value = content
      document.body.appendChild(oInput)
      oInput.select()
      document.execCommand('Copy')
      oInput.className = 'oInput'
      oInput.style.display = 'none'
    },
    testFun(x){
      x = {
        b:2
      }
      x.b = 2
    }
  },
});
</script>
<style lang="scss" scoped>
.content{
  background: gray;
  height: 500px;
}
.page-box{
          margin: 18px auto;
          text-align: center;
          padding-bottom: 18px;
          /deep/ {
            .ivu-page-item a{
              margin: 0px;
            }
            .ivu-page-item{
              &.ivu-page-item-active{
                a {
                  background-color: #FF6B2D;
                }
              }
              a{
                margin: 0px;
              }
            }
          }
        }
</style>
