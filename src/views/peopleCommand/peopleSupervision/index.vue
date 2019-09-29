<template>
	<div>
		<div class="toolbar" style="float: left;">
			<el-form :inline="true"><!-- :size="size" -->
				<el-form-item label="名称">
					<el-input v-model="search.mingcheng" placeholder="搜索条件"></el-input>
				</el-form-item>
				<el-form-item label="年龄">
					<el-input v-model="search.nianling" placeholder="搜索条件"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button  label="查询" type="primary" @click="query">查询</el-button>
				</el-form-item><!-- icon="fa fa-search" -->
				<el-form-item>
					<el-button label="新增" type="primary" @click="handleAdd">新增</el-button>
				</el-form-item>
			</el-form>
		</div>
		<!-- 主内容 -->
		<el-table :data="pageResult" border stripe size="mini" style="width: 100%" row-key="id">
			<el-table-column type="index" header-align="left" align="left" show-overflow-tooltip label="序号" />
			<el-table-column prop="mingcheng" header-align="left" align="left" show-overflow-tooltip label="名称" />
			<el-table-column prop="jingfei" header-align="left" align="left" show-overflow-tooltip label="经费" />
			<el-table-column prop="shijian" sortable header-align="left" align="left" show-overflow-tooltip label="添加时间" />
			<el-table-column prop="zhiyi" header-align="left" align="left" show-overflow-tooltip label="质疑信息" />
			<el-table-column :label="'操作'">
				<template slot-scope="scope">
					<el-button size="mini" icon="el-icon-delete-solid" label="编辑" type="text" @click="edit(scope.row)">编辑</el-button>
					<el-button size="mini" icon="el-icon-delete-solid" label="删除" type="text" @click="del(scope.$index, scope.row)">删除</el-button>
				</template>
			</el-table-column>
		</el-table>
		<!--分页栏-->
		<div class="pagination">
			<el-pagination layout="total, sizes, prev, pager, next, jumper" @current-change="refreshPageRequesta" @size-change="handleSizeChangea"
			 :current-page="box.pageNum" :page-size="box.pageSize" :total="box.total">
			</el-pagination>
		</div>

      <!--新增（）界面-->
    <el-dialog title="新增" width="600px"  :visible.sync="addloading"  :close-on-click-modal="false">
        <el-form :model="addForm" label-width="120px" :rules="addFormRules"  ref="addForm" :size="size">
            <el-form-item label="名称:" prop="mingcheng">
                <el-input v-model="addForm.mingcheng" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="经费:" prop="jingfei">
                <el-input v-model="addForm.jingfei" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="添加时间:" prop="shijian">
                <el-date-picker
                  v-model="addForm.shijian"
                  type="datetime"
                  value-format="yyyy-MM-dd HH-mm-ss"
                  placeholder="选择日期时间">
                </el-date-picker>
            </el-form-item>
            <el-form-item label="质疑信息:" prop="zhiyi">
                <el-input v-model="addForm.zhiyi" auto-complete="off"></el-input>
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
	Mock.mock('http://peopleSupervision.com', {
		'shuju|56': [{
			id:"@id",
			mingcheng:"@cname",
			"jingfei":"@float(0, 9999, 2,2)",
			'shijian|1': "@datetime()",
			zhiyi:"@cparagraph",

		}]
	})
	export default {
		data() {
			return {
				size:"small",
				search: {
					mingcheng: "",
					nianling: "",
				},
				pageResult: [],
				box: {
				 total: 0,        // 总数
				pageNum: 1,  // 当前位于哪页
				pageSize: 20,   // 1页显示多少条

				},
        addloading:false,
        addForm:{
         mingcheng:"",
         jingfei:"",
         shijian:"",
         zhiyi:"",
        },
        addFormRules:{
mingcheng:[{ required: true, message: "请输入姓名", trigger: "blur" }],
jingfei:[{ required: true, message: "请输入电话", trigger: "blur" }],
shijian:[{ required: true, message: "请输入事件类型", trigger: "blur" }],
zhiyi:[{ required: true, message: "请输入事件详细描述", trigger: "blur" }],
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
					url: "http://peopleSupervision.com",
					// url: "http://localhost:3000/list",

				}).then(res => {
					this.pageResult = res.data.shuju
					this.box.total = res.data.shuju.length
					console.log(res)
				})
			},
			query() {//查询
				axios({
					method: "get",
					url: `http://localhost:3000/list?name=${this.search.mingcheng}`
				}).then(res => {
					this.pageResult = res.data
					this.box.total = res.data.length
					console.log(res)
				})
			},
			handleAdd() {//新增按钮
this.addloading=true
			},
      submitForm(){//新增提交
      this.$refs.addForm.validate(valid => {
      if (valid) {
console.log(this.addForm)
this.pageResult.unshift(this.addForm)
this.addloading=false
        }
      })
      },
			see(row) {},
			del(index, row) {//删除
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
  img{
    width: 100px;
    height:50px;
  }
</style>
