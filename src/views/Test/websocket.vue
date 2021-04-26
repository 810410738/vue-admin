<template>
  <div>
    <el-row>
      <el-col :span="6">
        <el-input v-model="inputData"></el-input>
      </el-col>
      <el-col :span="6">
        <el-button @click="sendMessage">send</el-button>
      </el-col>
    </el-row>
    
  </div>
</template>

<script>
export default {
  created() {
    this.openSocket();
  },
  components: {
    
  },
  data() {
    return {
      socket:null,
      socketUrl:"ws://127.0.0.1:8081/relife_admin/webSocket/",
      // socketUrl:"ws://123.207.136.134:9010/ajaxchattest",
      inputData:"",
    };
  },
  methods: {
    init() {
    },
    openSocket(){
      if(this.socket != null ){
        this.socket.close();
        this.socket = null;
      }
      if(this.$route.query.userId == null ){
        this.$message.error("userId不存在");
        return ;
      }
      this.socketUrl += this.$route.query.userId;
      this.socket = new WebSocket(this.socketUrl);

      this.socket.onopen = () =>{
        console.log("websocket已打开");
        this.socket.send("连接成功");
      }

      this.socket.onmessage = (data) =>{
        console.log("websocket接收服务器消息：" + data.data);
        this.updateStatus(data.data);
      }
      
      this.socket.onclose = () =>{
        console.log("websocket已关闭");
      }

      this.socket.onerror = (error) =>{
        console.log(error);
      }
    },
    sendMessage(){
      this.socket.send(this.inputData);
    },
    /**
     * 更新状态显示
     */
    updateStatus(data){
       this.$message({
          message: data,
          type: "success"
        });
    }
  }
}; 
</script>
<style lang="scss" scoped>

</style>
