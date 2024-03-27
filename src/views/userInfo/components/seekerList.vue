<template>
  <div>
    <el-card>
      <el-table
        :data="jobList"
        stripe
        style="width: 100%"
      >
        <el-table-column
          type="selection"
          width="55"
        />
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-form label-position="left" inline class="demo-table-expand">
              <el-form-item label="求职者姓名">
                <span>{{ props.row.name }}</span>
              </el-form-item>
              <el-form-item label="学位">
                <span>{{ props.row.degree }}</span>
              </el-form-item>
              <el-form-item label="年龄">
                <span>{{ props.row.age }}</span>
              </el-form-item>
              <el-form-item label="求职职位">
                <span>{{ props.row.desiredJdType }}</span>
              </el-form-item>
              <el-form-item label="当前任职职位">
                <span>{{ props.row.curJdType }}</span>
              </el-form-item>
              <el-form-item label="期望工资">
                <template slot-scope="{ props }">
                  <span>{{ props.row.desiredSalaryId }} </span>
                </template>
              </el-form-item>
              <el-form-item label="开始工作时间">
                <template slot-scope="{ props }">
                  <span>{{ props.row.startWorkDate }}</span>
                </template>
              </el-form-item>
              <el-form-item label="当前任职公司">
                <span>{{ props.row.curIndustry }}</span>
              </el-form-item>
              <el-form-item label="现居地址">
                <span>{{ props.row.liveCity }}</span>
              </el-form-item>
              <el-form-item label="联系方式">
                <span>{{ props.row.phone }}</span>
              </el-form-item>
              <el-form-item label="经验/经历">
                <span>{{ props.row.experience }}</span>
              </el-form-item>
<!--              <el-form-item label="专业知识">-->
<!--                <span>{{ props.row.knowledge }}</span>-->
<!--              </el-form-item>-->
<!--              <el-form-item label="个人素养">-->
<!--                <span>{{ props.row.quality }}</span>-->
<!--              </el-form-item>-->
            </el-form>
          </template>
        </el-table-column>
        <el-table-column
          prop="name"
          label="求职者姓名"
          width="180"
        />
        <el-table-column
          prop="degree"
          label="学位"
          width="180"
        />
        <el-table-column
          prop="age"
          label="年龄"
          width="180"
        />
        <el-table-column
          label="性别"
        >
          <template slot-scope="{ row }">
            {{ row.age }}
          </template>
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
          width="160"
        >
          <template slot-scope="scope">
            <el-col :span="8">
              <el-button type="warning" icon="el-icon-star-off" circle @click="setStatisfied(scope.row)" />
            </el-col>
<!--            <el-col :span="16">-->
<!--              <el-button type="primary" round @click="setDeliver">投递</el-button>-->
<!--            </el-col>-->
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <!--  分页组件-->
    <el-pagination
      :current-page="searchmodel.pageNo"
      :page-sizes="[10, 20, 30, 40]"
      :page-size="searchmodel.pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
    <div/>
  </div>
</template>
<script>
import actionApi from '@/api/action'
import { getResumeList } from '@/api/user'

export default {
  data() {
    return {
      total: 0,
      searchmodel: {
        pageNo: 1,
        pageSize: 10
      },
      ResumeList: []
    }
  },
  created() {
    this.getFavorList()
  },
  methods: {
    async getFavorList() {
      await getResumeList(this.searchmodel).then(response => {
        this.ResumeList = response.data.rows
        this.total = response.data.total
      })
      this.$message({
        message: '查询Resume成功',
        type: 'success'
      })
    },
    async setFavor(row) {
      // 假设您已经获取到jdNo
      const id = row.id

      await actionApi.setStatisfied(id)
        .then(data => {
          this.$message({
            message: data.message,
            type: 'success'
          })
        })
        .catch(error => {
          this.$message.error({
            message: '操作异常' + error
          })
        })
      await this.getFavorList()
    },
    // async setDeliver(row) {
    //   const id = row.id
    //   await actionApi.deliver(id)
    //     .then(data => {
    //       this.$message({
    //         message: data.message,
    //         type: 'success'
    //       })
    //     })
    //     .catch(error => {
    //       this.$message.error({
    //         message: '投递失败' + error
    //       })
    //     })
    // },
    handleSizeChange() {
    },
    handleCurrentChange() {
    }
  }
}
</script>
<style scoped>
.container {
  margin: 15px 10px;
}

.el-select .el-input {
  width: 130px;
}

.input-with-select .el-input-group__prepend {
  background-color: #fff;
}

.el-card {
  margin-bottom: 10px;
}

.demo-table-expand {
  font-size: 0;
}

.demo-table-expand label {
  width: 120px;
  color: #99a9bf;
}

.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 100%;
}

</style>
