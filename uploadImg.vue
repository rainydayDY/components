/*!
 * upload-img
 *
 * 上传文件组件
 *
 * @author dy
 * @version 1.0.0 20180611
 */
<template>
  <div>
  <input type="file" @change="handleFile" ref="inputFile" style="display:none"/>
  </div>
</template>

<script>


export default {
    name: 'upload-img',
    props: {
        width: {
            type: Number,
            default: 0
        },
        height: {
            type: Number,
            default: 0,
        },
        size: {
            type: Number,
            default: 5
        },
        fileType: {
            type: String,
            default: 'image'
        }
    },
    data() {
        return {
        };
    },
    methods: {
        handleImg(file) {
            const fileType = file.type.split('/')[1];
            if (fileType !== 'jpg' && fileType !== 'png' && fileType !== 'jpeg') {
                this.$message.error('请上传JPG、PNG或JPEG格式的图片!');
                return;
            }
            const reader = new FileReader();
            reader.onload = () => {
                if (this.width && this.height) {
                    var image = new Image();
                    image.onload = () => {
                        if (image.width / image.height > (this.width / this.height + 0.1) || image.width / image.height < (this.width / this.height - 0.2)) {
                            this.$message.error(`请确认上传尺寸(长：${this.width}，宽：${this.height}，或者长宽比为${this.width / this.height})`);
                            return;
                        }
                        this.$emit('onchange', file, reader.result, 'image');
                    };
                    image.src = reader.result;
                } else {
                    this.$emit('onchange', file, reader.result, 'image');
                }
            };
            reader.readAsDataURL(file);
        },
        handlePdf(file, reg) {
            const fileType = file.name.split('.')[1];
            if (!fileType.match(reg)) {
                this.$message.error('请按照规则上传文件!');
                return;
            }
            const reader = new FileReader();
            reader.onload = () => {
                this.$emit('onchange', file, file.name, 'application');
            };
            reader.readAsDataURL(file);
        },
        handleFile(e) {
            let file = e.target.files[0];
            if (file.size / 1024 / 1024 > this.size) {
                this.$message.error(`请上传小于${this.size}M的文件!`);
                return;
            }
            if (this.fileType === 'image') {
                // 仅允许上传图片
                this.handleImg(file);
            } else if (this.fileType === 'application') {
                // 仅允许上传pdf或者doc
                this.handlePdf(file, /(pdf|doc|docx)/g);
            } else if (this.fileType === 'image&&application') {
                // 即允许图片也允许pdf
                const typeFlag = file.type.split('/')[0];
                if (typeFlag === 'image') {
                    this.handleImg(file);
                } else if (typeFlag === 'application') {
                    this.handlePdf(file, /(pdf)/g);
                } else {
                    this.$message.error('请上传docx、pdf格式的文件或者JPG、PNG、JPEG格式的图片!');
                }
            }
        }
    }
};
</script>

I
