$(document).ready(function() {
    // bibtex
    var editor = CodeMirror.fromTextArea(document.getElementById("bibtex"), {
        lineNumbers: false,
        lineWrapping: true,
        readOnly:true
    });

    // generated code
    var codegen_html_template = `
<p>Code generated by our Language Model Program (<a href="{link}">raw text file</a>):</p>
<pre class="codegen"><code class="language-python">{code}</code></pre>`;
    $('[id^="code_"]').each(function() {
        var id = this.id;
        domain_name_cmd_idx = id.substring(5);
        var sep_idx = domain_name_cmd_idx.indexOf('_');
        var domain_name = domain_name_cmd_idx.substring(0, sep_idx);
        var cmd_idx_str = domain_name_cmd_idx.substring(sep_idx + 1);

        var codegen_file = '/codegen/' + domain_name + '/' + cmd_idx_str + '.txt';
        $.get(codegen_file, function(data) {
            var highlighted_code = hljs.highlight(data, {language: 'python'}).value;
            var html_code = codegen_html_template
                                .replace('{code}', highlighted_code)
                                .replace('{link}', codegen_file);
            $(html_code).appendTo("#" + id);
         }, 'text');
    });

    var current_cmd_idxs = {
        "linereal": 1,
        "linesim": 1,
        "pairreal": 1,
        "pairsim": 1,
        "areareal": 1,
        "areasim": 1,
        "fractal": 1,
        "aloha": 1,
        "chest": 1,
        "stonehoe": 1,
        "minecart":1,
    }

    var vid_start_times = {
        "chest": {
            1: 0,
            2: 5,
            3: 7,
            4: 11,
        },
        "stonehoe": {
            1:0,
            2:9,
            3:13,
            4:16,
            5:19,
            6:26,
            7:36,
        },
        "minecart": {
            1:0,
            2:27,
            3:31,
            4:35,
            5:38,
            6:49,
            7:93,
            8:102,
            9:113,
            10:152,
            11:207,
        },        
        "linereal": {
            1: 0,
            2: 1,
            3: 2,
            4: 3,
            5: 4,
            6: 5,
            7: 6,
            8: 7,
            9: 8,
            10: 9,
        },
        "linesim": {
            1: 0,
            2: 1,
            3: 2,
            4: 3,
            5: 4,
            6: 5,
            7: 6,
            8: 7,
            9: 8,
            10: 9,
            11: 10,
            12: 11,
            13: 12,
            14: 13,
            15: 14,
            16: 15,
        },
        "pairreal": {
            1: 0,
            2: 1,
            3: 2,
            4: 3,
            5: 4,
            6: 5,
            7: 6,
            8: 7,
        },
        "pairsim": {
            1: 0,
            2: 1,
            3: 2,
            4: 3,
            5: 4,
            6: 5,
            7: 6,
            8: 7,
        },
        "areareal": {
            1: 0,
            2: 1,
            3: 2,
            4: 3,
            5: 4,
            6: 5,
            7: 6,
            8: 7,
            9: 8,
            10: 9,
            11: 10,
            12: 11,
        },
        "areasim": {
            1: 0,
            2: 1,
            3: 2,
            4: 3,
            5: 4,
            6: 5,
            7: 6,
            8: 7,
            9: 8,
            10: 9,
            11: 10,
            12: 11,
            13: 12,
            14: 13,
        },
        "fractal": {
            1: 0,
            2: 2,
            3: 4,
            4: 6,
        },
        "aloha": {
            1: 0,
            2: 3,
            3: 6,
            4: 9,
            5: 12,
            6: 15,
            7: 18,
            8: 21,
            9: 24,
            10: 27,
            11: 30,
            12: 33,
            13: 36,
        },
    }

    var vid_end_times = {
        "chest": {
            1: 5,
            2: 7,
            3: 11,
            4: 18,
        },
        "stonehoe": {
            1:9,
            2:13,
            3:16,
            4:19,
            5:26,
            6:36,
            7:47
        },
        "minecart": {
            1:27,
            2:31,
            3:35,
            4:38,
            5:49,
            6:93,
            7:102,
            8:113,
            9:152,
            10:207,
            11:226,
        },    
        "linereal": {
            1: 1,
            2: 2,
            3: 3,
            4: 4,
            5: 5,
            6: 6,
            7: 7,
            8: 8,
            9: 9,
            10:10,
        },
        "linesim": {
            1: 1,
            2: 2,
            3: 3,
            4: 4,
            5: 5,
            6: 6,
            7: 7,
            8: 8,
            9: 9,
            10:10,
            11:11,
            12:12,
            13:13,
            14:14,
            15:15,
            16:16,
        },
        "pairreal": {
            1: 1,
            2: 2,
            3: 3,
            4: 4,
            5: 5,
            6: 6,
            7: 7,
            8: 8,
        },
        "pairsim": {
            1: 1,
            2: 2,
            3: 3,
            4: 4,
            5: 5,
            6: 6,
            7: 7,
            8: 8,
        },
        "areareal": {
            1: 1,
            2: 2,
            3: 3,
            4: 4,
            5: 5,
            6: 6,
            7: 7,
            8: 8,
            9: 9,
            10:10,
            11:11,
            12:12,
        },
        "areasim": {
            1: 1,
            2: 2,
            3: 3,
            4: 4,
            5: 5,
            6: 6,
            7: 7,
            8: 8,
            9: 9,
            10:10,
            11:11,
            12:12,
            13:13,
            14:14,
        },
        "fractal": {
            1: 2,
            2: 4,
            3: 6,
            4: 8,
        },
        "aloha": {
            1: 3,
            2: 6,
            3: 9,
            4: 12,
            5: 15,
            6: 18,
            7: 21,
            8: 24,
            9: 27,
            10: 30,
            11: 33,
            12: 36,
            13: 39,
        },
    }

    function playSeg(vid, start_time, end_time, domain_name, desired_cmd_idx) {
        vid.play();
        vid.pause();
        vid.currentTime = start_time;
        vid.play();

        // console.log("start and end: " + start_time.toString() + ", " + end_time.toString());

        var pausing_function = function() {
            // console.log("checking pausing function cb for " + domain_name);
            // console.log("current and end time");
            // console.log(this.currentTime);
            // console.log(end_time)
            if (this.currentTime >= end_time) {
                // console.log("reached end time");
                this.pause();
                this.removeEventListener("timeupdate", pausing_function);
            }
        };

        // console.log("adding timeupdate pausing_function for " + domain_name + "_" + desired_cmd_idx.toString());
        vid.addEventListener("timeupdate", pausing_function);
    }

    // demos
    $('select').on('change', function() {
        var sep_idx = this.value.indexOf('_');
        var domain_name = this.value.substring(0, sep_idx);
        var desired_cmd_idx = parseInt(this.value.substring(sep_idx + 1));
        var current_cmd_idx = current_cmd_idxs[domain_name];
        
        // hide current content
        var current_content = $('#content_' + domain_name + "_" + current_cmd_idx.toString());
        current_content.hide();

        // show desired content
        var desired_content = $('#content_' + domain_name + "_" + desired_cmd_idx.toString());
        desired_content.show();

        // switch videos
        if (domain_name.startsWith("mobile")) {
            var current_vid = $('#vid_1_' + domain_name + "_" + current_cmd_idx.toString()).get(0);
            var desired_vid = $('#vid_1_' + domain_name + "_" + desired_cmd_idx.toString()).get(0);
            current_vid.pause();
            desired_vid.play();
        } else {
            var vid = $("#vid_" + domain_name)[0];
            var start_time = vid_start_times[domain_name][desired_cmd_idx];
            var end_time = vid_end_times[domain_name][desired_cmd_idx];
            playSeg(vid, start_time, end_time, domain_name, desired_cmd_idx);
        }

        // set current to desired
        current_cmd_idxs[domain_name] = desired_cmd_idx;
    });
});
