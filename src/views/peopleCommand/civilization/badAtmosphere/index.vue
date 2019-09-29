<template>
  <div>
    <div class="toolbar" style="float: left;">
      <el-form :inline="true">
        <!-- :size="size" -->
        <el-form-item label="乡风类型:">
          <el-select v-model="search.quyu" placeholder="请选择活动区域">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="发生时间:">
          <el-date-picker v-model="search.quyu" type="datetime" placeholder="选择日期时间">
          </el-date-picker>
        </el-form-item>
        </hr>
        <el-form-item label="是否超标:">
          <el-select v-model="search.quyu" placeholder="请选择活动区域">
            <el-option label="是" value="true"></el-option>
            <el-option label="否" value="false"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="超标金额:">
          <el-select v-model="search.quyu" placeholder="请选择活动区域">
            <el-option label="大于5000" value="5000"></el-option>
            <el-option label="小于5000" value="10000"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="是否承诺:">
          <el-select v-model="search.quyu" placeholder="请选择活动区域">
            <el-option label="是" value="true"></el-option>
            <el-option label="否" value="false"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="处置状态:">
          <el-select v-model="search.quyu" placeholder="请选择活动区域">
            <el-option label="已处置" value="true"></el-option>
            <el-option label="为处置" value="false"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="签约类型:">
          <el-select v-model="search.leixing" placeholder="请选择活动区域">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        </hr>
        <el-form-item laebl="姓名">
          <el-input v-model="search.username" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item laebl="房屋编码">
          <el-input v-model="search.username" placeholder="请输入"></el-input>
        </el-form-item>


      </el-form>
    </div>
    <!-- 主内容 -->
    <el-table :data="pageResult" border stripe size="mini" style="width: 100%" row-key="id">
      <el-table-column prop="daima" header-align="left" align="left" show-overflow-tooltip label="事件代码" />
      <el-table-column prop="leixing" header-align="left" align="left" show-overflow-tooltip label="乡风类型" />
      <el-table-column prop="chengnuo" header-align="left" align="left" show-overflow-tooltip label="是否承诺" width="80px" />
      <el-table-column prop="chuzhi" header-align="left" align="left" show-overflow-tooltip label="处置状态" />
      <el-table-column prop="xinyong" header-align="left" align="left" show-overflow-tooltip label="信用分" width="80px" />
      <el-table-column prop="pingjun" header-align="left" align="left" show-overflow-tooltip label="平均每桌消费" />
      <el-table-column prop="renjun" header-align="left" align="left" show-overflow-tooltip label="人均红包" width="80px" />
      <el-table-column prop="chaobiao" header-align="left" align="left" show-overflow-tooltip label="是否超标" width="80px" />
      <el-table-column prop="xiangguan" header-align="left" align="left" show-overflow-tooltip label="相关人员" width="120px" />
      <el-table-column prop="bianma" header-align="left" align="left" show-overflow-tooltip label="房屋编码" />
      <el-table-column prop="fasheng" header-align="left" align="left" show-overflow-tooltip label="发生时间" />
      <el-table-column :label="'操作'">
        <template slot-scope="scope">
          <el-button size="mini" icon="el-icon-delete-solid" label="查看" type="text" @click="see(scope.row)">查看</el-button>
          <el-button size="mini" icon="el-icon-delete-solid" label="更多" type="text" @click="del(scope.$index, scope.row)">更多</el-button>
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

  let aaa = "888888888888"

  Mock.mock('http://badAtmosphere.com', {
    'shuju|66': [{
      "daima": "@guid",//B707C5Ff-6D95-CA74-4b(随机)
      'leixing|1': ['不危险驾驶', '不占道经营', '不高空坠物', '红白事不超标'],//(随机)4中1
      "chengnuo|1": ["是", "否"],//(随机)2中1
      "chuzhi|1": ["已处置", "未处置"],//(随机)2中1
      "xinyong|500-1000": 1000,//(随机)500-1000的数字
      photo: "@image('100x50', '@hex', '#FFFFFF', 'png', '')",//(随机)图片（宽*高，背景颜色，字体颜色，格式，字）
      phone: /^1[385][1-9]\d{8}/,//正则校验手机号
      "chaobiao|1": ["是", "否"],//(随机)2中1
      xiangguan: "@cname()",//(随机)姓名
      bianma: aaa,//  等于let aaa = "888888888888"
      nowtiem: "@datetime(yyyy-hh-ss)",//(随机)时间
      fasheng: "@now()",//(随机)获得现在的时间
      word: "@word(3, 5)",//(随机)获得3-5个英文字母
      renjun: "@cparagraph(1)",//(随机)获得1行（约12个）汉字
      "bbb|1":"@shuffle(['a', 'e', 'i', 'o', 'u'])",//(随机)获得字母排序
      "pingjun|500-1000": function() {//等于上文项目的值+1
        return this.xinyong + 1
      },
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
          daima: "",
          leixing: "",
          chengnuo: "",
          chuzhi: "",
          xinyong: "",
          pingjun: "",
          renjun: "",
          chaobiao: "",
          xiangguan: "",
          bianma: "",
          fasheng: "",
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
          url: "http://badAtmosphere.com",
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
  /*  /deep/ .el-form-item__content {
    line-height: 33px;
    text-align: left;
  }

  .tips {
    display: inline-block;
    float: right;
  }*/
  .el-form-item {
    float: left;
  }

  img {
    width: 100px;
    height: 50px;
  }
</style>
