export const FORMCONFIG = [{
  TitleConfig: {
    title: '事件信息',
    status: '',
    showstatus: false,
    showCard: false
  },
  FormConfig: [
    {
      span: 12,
      label: '事件流水号',
      prop: 'flowNumber',
      type: 'text',
      disabled: false,
      rules: [
        { required: true, message: '请输入咨询流水号', trigger: 'blur' }
      ]
    },
    {
      span: 12,
      label: '紧急程度',
      prop: 'emergency',
      type: 'select',
      data: [{ name: '一般', id: 1 }, { name: '紧急', id: 2 }, { name: '非常紧急', id: 3 }],
      disabled: false,
      rules: [
        { required: true, message: '请选择紧急程度', trigger: 'change' }
      ]
    },
    {
      span: 12,
      label: '联动输入1',
      prop: 'link1',
      type: 'text',
      disabled: false,
      linkage: (form, formConfig) => {
        if (form.link1 === '') {
          form.link2 = 1
        } else {
          form.link2 = parseInt(form.link1) + 1
        }
      }
    },
    {
      span: 12,
      label: '联动输入2',
      prop: 'link2',
      type: 'text',
      disabled: true
    },
    {
      span: 12,
      label: '时间范围',
      prop1: 'time1',
      prop2: 'time2',
      linkWord: '到',
      type: 'datetimepickerrange',
      disabled: false,
      rules1: [
        { required: true, message: '请填写范围', trigger: 'blur' }
      ],
      rules2: [
        { required: true, message: '请填写范围', trigger: 'blur' }
      ]
    },
    {
      span: 12,
      label: '时间范围',
      prop1: 'time1',
      prop2: 'time2',
      linkWord: '到',
      type: 'inputselect',
      disabled: false,
      rules1: [
        { required: true, message: '请填写范围', trigger: 'blur' }
      ],
      rules2: [
        { required: true, message: '请填写范围', trigger: 'blur' }
      ]
    },
    {
      span: 12,
      label: '地图位置',
      prop1: 'lng',
      prop2: 'lat',
      type: 'map',
      mapDialogVisible: false,
      rules1: [
        { required: true, message: '请选择地点', trigger: 'blur' }
      ],
      rules2: [
        { required: true, message: '请选择地点', trigger: 'blur' }
      ]
    },
    {
      span: 12,
      label: '楼宇地址',
      prop1: 'province',
      prop2: 'city',
      prop3: 'county',
      prop4: 'address',
      type: 'address'
    },
    {
      span: 24,
      label: '证明图片',
      prop: 'receivedAttach',
      type: 'upload',
      limit: 1
    },
    {
      span: 24,
      label: '事件内容',
      prop: 'eventContent',
      type: 'textarea',
      autosize: { minRows: 8, maxRows: 10 },
      disabled: false,
      rules: [
        { required: true, message: '请输入处理结果', trigger: 'blur' }
      ]
    },
    {
      span: 24,
      label: '处理结果',
      prop: 'processingResult',
      type: 'textarea',
      disabled: false,
      rules: [
        { required: true, message: '请输入处理结果', trigger: 'blur' }
      ]
    }
  ]
}]
export const EXPANDBTN = [{
  name: '确认处理',
  emitName: 'submit',
  type: 'primary'
},
{
  name: '关闭事件',
  emitName: 'closeevent',
  type: 'danger'
},
{
  name: '取消',
  emitName: 'formcancle',
  type: 'warning'
}
]
