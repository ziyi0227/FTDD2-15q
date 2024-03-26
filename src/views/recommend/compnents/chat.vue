
<template>
  <div>
    <div ref="chatContainer" class="chat-container">
      <div v-for="(message, index) in messages" :key="index" class="message" :class="{ 'user-message': message.isUserMessage, 'ai-message': !message.isUserMessage }">
        <div v-if="message.isUserMessage" class="user-avatar">
          <el-avatar icon="el-icon-user-solid"></el-avatar>
        </div>
        <div v-else class="ai-avatar">
          <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
        </div>
        <p>{{ message.text }}</p>
      </div>
    </div>
    <div class="input-container">
      <input v-model="inputMessage" placeholder="Type your message..." @keyup.enter="sendMessage">
      <button @click="sendMessage">Send</button>
    </div>
  </div>
</template>

<script>
import { getChatContent } from '@/api/chat.js' // 根据你的实际路径导入请求方法

export default {
  data() {
    return {
      inputMessage: '',
      messages: []
    }
  },
  methods: {
    async sendMessage() {
      if (!this.inputMessage.trim()) return // 确保消息不为空

      try {
        this.messages.push({ text: this.inputMessage, isUserMessage: true }) // 将用户输入的消息添加到消息列表中
        const response = await getChatContent({ q: this.inputMessage })
        this.messages.push({ text: response.data.output.text, isUserMessage: false }) // 将返回的聊天内容添加到消息列表中
        this.inputMessage = '' // 清空输入框
        this.scrollChatToBottom() // 滚动到最底部
      } catch (error) {
        console.error('Error sending message:', error)
      }
    },
    scrollChatToBottom() {
      this.$refs.chatContainer.scrollTop = this.$refs.chatContainer.scrollHeight
    }
  }
}
</script>

<style>
.chat-container {
  height: 300px; /* 设置聊天容器的高度 */
  overflow-y: auto; /* 如果内容过多，显示滚动条 */
  border: 1px solid #ccc;
  padding: 10px;
}

.message {
  margin-bottom: 10px;
  padding: 5px;
  display: flex;
}

.user-message {
  text-align: left;
}

.ai-message {
  text-align: left;
}

.user-avatar,
.ai-avatar {
  margin-right: 10px;
}

.input-container {
  margin-top: 20px;
}

.input-container input {
  width: 70%; /* 设置输入框宽度 */
  padding: 10px;
  border: 1px solid #ccc;
}

.input-container button {
  width: 20%; /* 设置发送按钮宽度 */
  padding: 10px;
  border: none;
  background-color: #007bff;
  color: #fff;
  cursor: pointer;
}

.input-container button:hover {
  background-color: #0056b3;
}
</style>
