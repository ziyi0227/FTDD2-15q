<template>
  <el-col span="24">
    <el-row :gutter="10">
      <el-col v-for="card in cardsData" :key="card.id" :span="8">
        <el-card shadow="hover" class="custom-card">
          <img :src="card.imageUrl" class="image">
          <div style="padding: 10px; margin-bottom: 5px">
            <h3>{{ card.companyName }}</h3>
            <div class="bottom clearfix" style="margin-bottom: auto">
              <time>{{ card.content }}</time>
              <el-button type="text" class="button">查看详情</el-button>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </el-col>
</template>

<script>
export default {
  data() {
    return {
      cardsData: [
        {
          id: 1,
          companyName: 'hdu集团',
          imageUrl: 'https://th.bing.com/th?id=OSK.801b659affe83d0ab8702d3976d7a684&w=148&h=148&c=7&o=6&dpr=1.3&pid=SANGAM',
          content: '高薪资，双休'
        },
        {
          id: 2,
          companyName: '某某公司',
          imageUrl: 'https://th.bing.com/th?id=OSK.801b659affe83d0ab8702d3976d7a684&w=148&h=148&c=7&o=6&dpr=1.3&pid=SANGAM',
          content: '五险一金，带薪年假'
        },
        {
          id: 3,
          companyName: '另一个公司',
          imageUrl: 'https://th.bing.com/th?id=OSK.801b659affe83d0ab8702d3976d7a684&w=148&h=148&c=7&o=6&dpr=1.3&pid=SANGAM',
          content: '周末双休，加班补助'
        },
        {
          id: 4,
          companyName: '最后第三个公司',
          imageUrl: 'https://th.bing.com/th?id=OSK.801b659affe83d0ab8702d3976d7a684&w=148&h=148&c=7&o=6&dpr=1.3&pid=SANGAM',
          content: '五险一金，带薪年假'
        },
        {
          id: 5,
          companyName: '最后第二个公司',
          imageUrl: 'https://th.bing.com/th?id=OSK.801b659affe83d0ab8702d3976d7a684&w=148&h=148&c=7&o=6&dpr=1.3&pid=SANGAM',
          content: '周末双休，加班补助'
        },
        {
          id: 6,
          companyName: '最后一个公司',
          imageUrl: 'https://th.bing.com/th?id=OSK.801b659affe83d0ab8702d3976d7a684&w=148&h=148&c=7&o=6&dpr=1.3&pid=SANGAM',
          content: '五险一金，带薪年假'
        }
      ]
    }
  }
}
</script>

<style>
.time {
  font-size: 13px;
  color: #999;
}

.bottom {
  margin-top: 13px;
  line-height: 12px;
}

.button {
  padding: 0;
  float: right;
}

.image {
  width: 100%;
  height: 100%;
  display: block;
  object-fit: cover; /* 图片填充整个容器并保持纵横比不变 */
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}

.clearfix:after {
  clear: both
}

.custom-card {
  width: 250px; /* 调整卡片的宽度 */
  margin-bottom: 10px; /* 调整卡片之间的间距 */
}
</style>
