<template>
  <div class="container">
    <!--搜索栏-->
    <el-card>
      <el-input placeholder="请输入内容" v-model="searchmodel.jobinput" class="input-with-select">
        <el-select v-model="searchmodel.jobtype" slot="prepend" placeholder="请选择">
          <el-option label="餐厅名" value="1"></el-option>
          <el-option label="订单号" value="2"></el-option>
          <el-option label="用户电话" value="3"></el-option>
        </el-select>
        <el-button slot="append" icon="el-icon-search"></el-button>
      </el-input>
    </el-card>
    <el-card>
      <el-table
        :data="jobList"
        stripe
        style="width: 100%">
        <el-table-column
          type="selection"
          width="55">
        </el-table-column>
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-form label-position="left" inline class="demo-table-expand">
              <el-form-item label="职位标题">
                <span>{{ props.row.name }}</span>
              </el-form-item>
              <el-form-item label="公司">
                <span>{{ props.row.company }}</span>
              </el-form-item>
              <el-form-item label="城市">
                <span>{{ props.row.city }}</span>
              </el-form-item>
              <el-form-item label="职位子类">
                <span>{{ props.row.jd_sub_type }}</span>
              </el-form-item>
              <el-form-item label="需求人数">
                <span>{{ props.row.require_nums }}</span>
              </el-form-item>
              <el-form-item label="月薪">
                <template slot-scope="{ props }">
                  <span>{{ props.row.min_salary }} ~ {{ props.row.max_salary }}</span>
                </template>
              </el-form-item>
              <el-form-item label="日期">
                <template slot-scope="{ props }">
                  <span>{{ props.row.start_date }} ~ {{ props.row.end_date }}</span>
                </template>
              </el-form-item>
              <el-form-item label="是否要求出差">
                <span>{{ props.row.is_travel }}</span>
              </el-form-item>
              <el-form-item label="工作经验年限">
                <span>{{ props.row.min_years }}</span>
              </el-form-item>
              <el-form-item label="最低学历">
                <span>{{ props.row.min_edu_level }}</span>
              </el-form-item>
              <el-form-item label="职位与专业技能">
                <span>{{ props.row.title_skill }}</span>
              </el-form-item>
              <el-form-item label="专业知识">
                <span>{{ props.row.knowledge }}</span>
              </el-form-item>
              <el-form-item label="个人素养">
                <span>{{ props.row.quality }}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column
          prop="name"
          label="职位标题"
          width="180">
        </el-table-column>
        <el-table-column
          prop="company"
          label="公司"
          width="180">
        </el-table-column>
        <el-table-column
          prop="city"
          label="城市"
          width="180">
        </el-table-column>
        <el-table-column
          label="月薪">
          <template slot-scope="{ row }">
            {{ row.min_salary }} ~ {{ row.max_salary }}
          </template>
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
          width="160">
          <template>
            <el-col :span="8">
              <el-button type="warning" icon="el-icon-star-off" circle></el-button>
            </el-col>
            <el-col :span="16">
              <el-button type="primary" round>投递</el-button>
            </el-col>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  <!--  分页组件-->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="searchmodel.pageNo"
      :page-sizes="[10, 20, 30, 40]"
      :page-size="searchmodel.pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
  </div>
</template>

<script>
export default {
  data() {
    return {
      total: 0,
      searchmodel: {
        pageNo: 1,
        pageSize: 10
      },
      jobList: [{
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄'
      }]
    }
  },
  methods: {
    handleSizeChange() {
    },
    handleCurrentChange() {
    }
  }
}
</script>

<style>
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
