 <template>
  <!-- 
   表单设计界面右边控制组件的
   控制字段属性组件
  -->
  <div>
    <el-form
      v-for="(item,index) in this.$store.state.Form.formData.Item"
      :key="item.key"
      v-show="item.isClick"
      label-position="top"
    >
      <el-form-item label="字段名字">
        <el-input v-model="item.name"></el-input>
      </el-form-item>
      <el-form-item label="标题">
        <el-input v-model="item.label"></el-input>
      </el-form-item>
      <el-form-item label="输入提示">
        <el-input v-model="item.placeholder"></el-input>
      </el-form-item>
      <el-form-item label="宽度">
        <el-input v-model="item.width">
          <template slot="append">%</template>
        </el-input>
      </el-form-item>
      <!-- select特有的操作 -->
      <div v-if="item.type == 'select'">
        <el-form-item label="选项">
          <el-tabs v-model="selectActiveName" type="border-card" :stretch="true">
            <!--  静态数据的页面 -->
            <el-tab-pane label="静态数据" name="static">
              <el-card v-for="(item1, index1) in item.options" :key="index1">
                <el-input size="mini" v-model="item1.label">
                  <template slot="prepend">Label</template>
                </el-input>
                <el-input size="mini" v-model="item1.value">
                  <template slot="prepend">Value</template>
                </el-input>
              </el-card>
              <el-button
                plain
                icon="el-icon-plus"
                size="mini"
                @click="changeSelectOption(index,'add')"
              ></el-button>
              <el-button
                type="danger"
                plain
                icon="el-icon-minus"
                size="mini"
                @click="changeSelectOption(index,'delete')"
              ></el-button>
            </el-tab-pane>
            <!--  动态数据的页面 -->
            <el-tab-pane label="动态数据" name="dynamic">
              <el-form>
                <el-form-item label="接口URL">
                  <el-input v-model="item.remoteURL">
                    <template slot="prepend">http://</template>
                  </el-input>
                </el-form-item>
              </el-form>
              <label>参数 ：</label>
              <el-card v-for="(item1, index1) in item.remoteParmas" :key="index1">
                <el-input size="mini" v-model="item1.key">
                  <template slot="prepend">Key</template>
                </el-input>
                <el-input size="mini" v-model="item1.value">
                  <template slot="prepend">Value</template>
                </el-input>
              </el-card>
              <el-button
                plain
                icon="el-icon-plus"
                size="mini"
                @click="changeSelectParams(index,'add')"
              ></el-button>
              <el-button
                type="danger"
                plain
                icon="el-icon-minus"
                size="mini"
                @click="changeSelectParams(index,'delete')"
              ></el-button>
            </el-tab-pane>
          </el-tabs>
          <el-checkbox v-model="item.isLinkOptions">联动获取数据</el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-select
            v-if="item.isLinkOptions"
            placeholder="请选择联动数据的下拉框"
            v-model="item.linkOptionsKey"
          >
            <el-option
              v-for="option_item in this.$store.state.Form.formData.Item"
              v-show="option_item.type == 'select' && option_item.key!=item.key"
              :key="option_item.key"
              :label="option_item.name"
              :value="option_item.key"
            ></el-option>
          </el-select>
        </el-form-item>
      </div>
      <!-- radio单选框特有的操作 -->
      <div v-else-if="item.type == 'radio'">
        <el-form-item label="radio类型">
          <el-radio-group v-model="item.radioType">
            <el-radio-button label="primary">基础样式</el-radio-button>
            <el-radio-button label="button">按钮样式</el-radio-button>
            <el-radio-button label="borderButton">带边框样式</el-radio-button>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="选项">
          <el-card>
            <el-card v-for="(item1, index1) in item.options" :key="index1">
              <el-input size="mini" v-model="item1.label">
                <template slot="prepend">Label</template>
              </el-input>
              <el-input size="mini" v-model="item1.value">
                <template slot="prepend">Value</template>
              </el-input>
            </el-card>
            <el-button
              plain
              icon="el-icon-plus"
              size="mini"
              @click="changeSelectOption(index,'add')"
            ></el-button>
            <el-button
              type="danger"
              plain
              icon="el-icon-minus"
              size="mini"
              @click="changeSelectOption(index,'delete')"
            ></el-button>
          </el-card>
        </el-form-item>
      </div>
      <!-- inputTextarea特有的操作 -->
      <div v-else-if="item.type == 'inputTextarea'">
        <el-form-item label="文本行数">
          <el-input-number v-model="item.rows" :min="2" :max="20"></el-input-number>
        </el-form-item>
      </div>
      <!--  -->
      <el-form-item label="操作属性">
        <el-checkbox v-model="item.disabled">禁用</el-checkbox>
      </el-form-item>
      <el-form-item label="校验">
        <el-checkbox v-model="item.required">必填</el-checkbox>
      </el-form-item>
      <el-form-item v-show="item.type != 'select'">
        <el-input v-model="item.pattern" placeholder="请填写正则表达式"></el-input>
      </el-form-item>
      <el-form-item label="校验不通过的提示文字" v-show="item.type != 'select'">
        <el-input v-model="item.errorText"></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  components: {},
  props: {},
  data() {
    return {
      // 右边操作属性的选项标签切换的名字
      selectActiveName: "static"
    };
  },
  mounted() {},
  methods: {}
};
</script>

<style lang="scss" scoped>
</style>
