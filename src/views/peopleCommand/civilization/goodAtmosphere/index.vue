<template>
  <div>
    <div class="toolbar" style="float: left;">
      <el-form :inline="true">
        <!-- :size="size" -->
        <el-form-item label="所属区域:">
          <!-- <el-input v-model="search.mingcheng" placeholder="搜索条件"></el-input> -->
          <el-select v-model="search.quyu" placeholder="请选择活动区域">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="所属存(社区):">
          <!-- <el-input v-model="search.mingcheng" placeholder="搜索条件"></el-input> -->
          <el-select v-model="search.cun" placeholder="请选择所属存(社区)">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item >
          <el-input v-model="search.username" placeholder="签约人"></el-input>
        </el-form-item>
        <el-form-item label="签约类型:">
          <!-- <el-input v-model="search.nianling" placeholder="搜索条件"></el-input> -->
          <el-select v-model="search.leixing" placeholder="请选择活动区域">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
         </br>
        <el-form-item style="float:left">
          <el-button label="查询" type="primary" @click="query">查询</el-button>
        </el-form-item><!-- icon="fa fa-search" -->
        <el-form-item style="float:left">
          <el-button label="新增" type="primary" @click="handleAdd">新增</el-button>
        </el-form-item>
      </el-form>
    </div>
    <!-- 主内容 -->
    <el-table :data="pageResult" border stripe size="mini" style="width: 100%" row-key="id">
      <el-table-column type="index" header-align="left" align="left" show-overflow-tooltip label="序号" />
      <el-table-column prop="name" header-align="left" align="left" show-overflow-tooltip label="签约人" />
      <el-table-column prop="type" header-align="left" align="left" show-overflow-tooltip label="签约类型类型" />
      <el-table-column prop="photo" header-align="left" align="left" show-overflow-tooltip label="事件照片">
        <template slot-scope="scope">
          <img :src="scope.row.photo">
        </template>
      </el-table-column>
      <el-table-column :label="'操作'">
        <template slot-scope="scope">
          <el-button size="mini" icon="el-icon-delete-solid" label="查看" type="text" @click="see(scope.row)">查看</el-button>
          <el-button size="mini" icon="el-icon-delete-solid" label="删除" type="text" @click="del(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!--分页栏-->
    <!-- <div class="pagination">
			<el-pagination layout="total, sizes, prev, pager, next, jumper" @current-change="refreshPageRequesta" @size-change="handleSizeChangea"
			 :current-page="box.pageNum" :page-size="box.pageSize" :total="box.total">
			</el-pagination>
		</div> -->
    <el-row>
      <el-col :span="24">
        <div class="pagination">
          <el-pagination v-if='box.total > 0' :page-sizes="box.pageSizes" :page-size="box.pageSize" :layout="box.layout"
            :total="box.total" :current-page='box.pageIndex' @current-change='refreshPageRequesta' @size-change='handleSizeChangea'>
          </el-pagination>
        </div>
      </el-col>
    </el-row>
    <!--新增（）界面-->
    <el-dialog title="新增" width="600px" :visible.sync="addloading" :close-on-click-modal="false">
      <el-form :model="addForm" label-width="120px" :rules="addFormRules" ref="addForm" :size="size">
        <el-form-item label="签约人:" prop="name">
          <el-input v-model="addForm.name" auto-complete="off"></el-input>
        </el-form-item>

        <el-form-item label="签约类型类型:" prop="type">
          <el-input v-model="addForm.type" auto-complete="off"></el-input>
        </el-form-item>

        <el-form-item label="事件照片:" prop="photo">
          <el-input v-model="addForm.photo" auto-complete="off"></el-input>
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button :size="size" @click.native="addloading = false">取消</el-button>
        <el-button :size="size" type="primary" @click.native="submitForm" edit>提交</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
  import axios from 'axios'
  import Mock from 'mockjs'
  Mock.mock('http://goodAtmosphere.com', {
    'shuju|56': [{
      id: "@id",
      name: "@cname",
      phone: /^1[385][1-9]\d{8}/,
      'type|1': ['不危险驾驶', '不占道经营', '不高空坠物', '红白事不超标'],
      photo: "http://nvzhuang.ping-jia.net/img.php?pic=http://img1.cache.netease.com/catchpic/0/09/0930DB2BF003ED1A3D504CFCF250E635.jpg",

    }]
  })
  export default {
    data() {
      return {
        size: "small",
        search: {
          quyu: "",
          cun: "",
          username: "",
          leixing: "",
        },
        pageResult: [],
        box: {
          total: 0, // 总数
          pageIndex: 1, // 当前位于哪页
          pageSize: 20, // 1页显示多少条
          pageSizes: [5, 10, 15, 20], //每页显示多少条
          layout: "total, sizes, prev, pager, next, jumper" // 翻页属性
        },
        addloading: false,
        addForm: {
          id: "",
          name: "",
          type: "",
          photo: "",
        },
        addFormRules: {
          name: [{
            required: true,
            message: "请输入签约人",
            trigger: "blur"
          }],

          type: [{
            required: true,
            message: "请输入签约类型",
            trigger: "blur"
          }],

          photo: [{
            required: true,
            message: "请输入事件照片",
            trigger: "blur"
          }],

        }
      }
    },
    created() {
      this.fetchData()
      // axios.get("http://123.com").then(res => {
      // 	console.log(res.data.shuju);
      // 	this.cunru = res.data.shuju
      // })

    },
    watch: {
      "search.mingcheng": [
        function() {
          clearTimeout(this.timer);
          this.timer = setTimeout(() => {
            this.fetchData()
          }, 500)
        }
      ],
      "search.name": [
        function() {
          clearTimeout(this.timera);
          this.timera = setTimeout(() => {
            this.fetchData()
          }, 500)
        }
      ],
    },
    methods: {
      fetchData() {
        axios({
          method: "get",
          url: "http://goodAtmosphere.com",
          // url: "http://localhost:3000/list",

        }).then(res => {
          this.pageResult = res.data.shuju
          this.box.total = res.data.shuju.length
          console.log(res)
        })
      },
      query() { //查询
        axios({
          method: "get",
          url: `http://localhost:3000/list?name=${this.search.mingcheng}`
        }).then(res => {
          this.pageResult = res.data
          this.box.total = res.data.length
          console.log(res)
        })
      },
      handleAdd() { //新增按钮
        this.addloading = true
      },
      submitForm() { //新增提交
        this.$refs.addForm.validate(valid => {
          if (valid) {

            this.pageResult.unshift(this.addForm)
            this.addloading = false
          }
        })
      },
      see(row) {},
      del(index, row) { //删除
        console.log(index)
        this.pageResult.splice(index, 1)
      },
      //分页
      refreshPageRequesta(pagea) {
        this.box.pageIndex = pagea
      },
      handleSizeChangea(vala) {
        this.box.pageSize = vala
      },
    }




  }
</script>

<style scoped>
  /deep/ .el-form-item__content {
    line-height: 33px;
    text-align: left;
  }

  .tips {
    display: inline-block;
    float: right;
  }

  img {
    width: 100px;
    height: 50px;
  }
</style>
