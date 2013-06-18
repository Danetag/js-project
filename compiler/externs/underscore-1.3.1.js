



<!DOCTYPE html>
<html>
<head>
 <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" >
 <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" >
 
 <meta name="ROBOTS" content="NOARCHIVE">
 
 <link rel="icon" type="image/vnd.microsoft.icon" href="http://www.gstatic.com/codesite/ph/images/phosting.ico">
 
 
 <script type="text/javascript">
 
 
 
 
 var codesite_token = "s8HhoKW_q6SiaFe6bO1ayZcJt-Q:1355987032015";
 
 
 var CS_env = {"assetVersionPath":"http://www.gstatic.com/codesite/ph/16229512607128645344","projectHomeUrl":"/p/closure-compiler","relativeBaseUrl":"","loggedInUserEmail":"Arno.Tanielian@gmail.com","profileUrl":"/u/109120733937413081764/","token":"s8HhoKW_q6SiaFe6bO1ayZcJt-Q:1355987032015","projectName":"closure-compiler","assetHostPath":"http://www.gstatic.com/codesite/ph","domainName":null};
 var _gaq = _gaq || [];
 _gaq.push(
 ['siteTracker._setAccount', 'UA-18071-1'],
 ['siteTracker._trackPageview']);
 
 _gaq.push(
 ['projectTracker._setAccount', 'UA-11444083-1'],
 ['projectTracker._trackPageview']);
 
 (function() {
 var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
 ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
 (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(ga);
 })();
 
 </script>
 
 
 <title>underscore-1.3.1.js - 
 closure-compiler -
 
 
 Closure Compiler - Google Project Hosting
 </title>
 <link type="text/css" rel="stylesheet" href="http://www.gstatic.com/codesite/ph/16229512607128645344/css/core.css">
 
 <link type="text/css" rel="stylesheet" href="http://www.gstatic.com/codesite/ph/16229512607128645344/css/ph_detail.css" >
 
 
 <link type="text/css" rel="stylesheet" href="http://www.gstatic.com/codesite/ph/16229512607128645344/css/d_sb.css" >
 
 
 
<!--[if IE]>
 <link type="text/css" rel="stylesheet" href="http://www.gstatic.com/codesite/ph/16229512607128645344/css/d_ie.css" >
<![endif]-->
 <style type="text/css">
 .menuIcon.off { background: no-repeat url(http://www.gstatic.com/codesite/ph/images/dropdown_sprite.gif) 0 -42px }
 .menuIcon.on { background: no-repeat url(http://www.gstatic.com/codesite/ph/images/dropdown_sprite.gif) 0 -28px }
 .menuIcon.down { background: no-repeat url(http://www.gstatic.com/codesite/ph/images/dropdown_sprite.gif) 0 0; }
 
 
 
  tr.inline_comment {
 background: #fff;
 vertical-align: top;
 }
 div.draft, div.published {
 padding: .3em;
 border: 1px solid #999; 
 margin-bottom: .1em;
 font-family: arial, sans-serif;
 max-width: 60em;
 }
 div.draft {
 background: #ffa;
 } 
 div.published {
 background: #e5ecf9;
 }
 div.published .body, div.draft .body {
 padding: .5em .1em .1em .1em;
 max-width: 60em;
 white-space: pre-wrap;
 white-space: -moz-pre-wrap;
 white-space: -pre-wrap;
 white-space: -o-pre-wrap;
 word-wrap: break-word;
 font-size: 1em;
 }
 div.draft .actions {
 margin-left: 1em;
 font-size: 90%;
 }
 div.draft form {
 padding: .5em .5em .5em 0;
 }
 div.draft textarea, div.published textarea {
 width: 95%;
 height: 10em;
 font-family: arial, sans-serif;
 margin-bottom: .5em;
 }

 
 .nocursor, .nocursor td, .cursor_hidden, .cursor_hidden td {
 background-color: white;
 height: 2px;
 }
 .cursor, .cursor td {
 background-color: darkblue;
 height: 2px;
 display: '';
 }
 
 
.list {
 border: 1px solid white;
 border-bottom: 0;
}

 
 </style>
</head>
<body class="t4">
<script type="text/javascript">
 window.___gcfg = {lang: 'en'};
 (function() 
 {var po = document.createElement("script");
 po.type = "text/javascript"; po.async = true;po.src = "https://apis.google.com/js/plusone.js";
 var s = document.getElementsByTagName("script")[0];
 s.parentNode.insertBefore(po, s);
 })();
</script>
<div class="headbg">

 <div id="gaia">
 

 <span>
 
 
 
 <a href="#" id="multilogin-dropdown" onclick="return false;"
 ><u><b>Arno.Tanielian@gmail.com</b></u> <small>&#9660;</small></a>
 
 
 | <a href="/u/109120733937413081764/" id="projects-dropdown" onclick="return false;"
 ><u>My favorites</u> <small>&#9660;</small></a>
 | <a href="/u/109120733937413081764/" onclick="_CS_click('/gb/ph/profile');"
 title="Profile, Updates, and Settings"
 ><u>Profile</u></a>
 | <a href="https://www.google.com/accounts/Logout?continue=http%3A%2F%2Fcode.google.com%2Fp%2Fclosure-compiler%2Fsource%2Fbrowse%2Ftrunk%2Fcontrib%2Fexterns%2Funderscore-1.3.1.js" 
 onclick="_CS_click('/gb/ph/signout');"
 ><u>Sign out</u></a>
 
 </span>

 </div>

 <div class="gbh" style="left: 0pt;"></div>
 <div class="gbh" style="right: 0pt;"></div>
 
 
 <div style="height: 1px"></div>
<!--[if lte IE 7]>
<div style="text-align:center;">
Your version of Internet Explorer is not supported. Try a browser that
contributes to open source, such as <a href="http://www.firefox.com">Firefox</a>,
<a href="http://www.google.com/chrome">Google Chrome</a>, or
<a href="http://code.google.com/chrome/chromeframe/">Google Chrome Frame</a>.
</div>
<![endif]-->



 <table style="padding:0px; margin: 0px 0px 10px 0px; width:100%" cellpadding="0" cellspacing="0"
 itemscope itemtype="http://schema.org/CreativeWork">
 <tr style="height: 58px;">
 
 
 
 <td id="plogo">
 <link itemprop="url" href="/p/closure-compiler">
 <a href="/p/closure-compiler/">
 
 
 <img src="/p/closure-compiler/logo?cct=1355443507"
 alt="Logo" itemprop="image">
 
 </a>
 </td>
 
 <td style="padding-left: 0.5em">
 
 <div id="pname">
 <a href="/p/closure-compiler/"><span itemprop="name">closure-compiler</span></a>
 </div>
 
 <div id="psum">
 <a id="project_summary_link"
 href="/p/closure-compiler/"><span itemprop="description">Closure Compiler</span></a>
 
 </div>
 
 
 </td>
 <td style="white-space:nowrap;text-align:right; vertical-align:bottom;">
 
 <form action="/hosting/search">
 <input size="30" name="q" value="" type="text">
 
 <input type="submit" name="projectsearch" value="Search projects" >
 </form>
 
 </tr>
 </table>

</div>

 
<div id="mt" class="gtb"> 
 <a href="/p/closure-compiler/" class="tab ">Project&nbsp;Home</a>
 
 
 
 
 <a href="/p/closure-compiler/downloads/list" class="tab ">Downloads</a>
 
 
 
 
 
 <a href="/p/closure-compiler/w/list" class="tab ">Wiki</a>
 
 
 
 
 
 <a href="/p/closure-compiler/issues/list"
 class="tab ">Issues</a>
 
 
 
 
 
 <a href="/p/closure-compiler/source/checkout"
 class="tab active">Source</a>
 
 
 
 
 
 
 
 
 <div class=gtbc></div>
</div>
<table cellspacing="0" cellpadding="0" width="100%" align="center" border="0" class="st">
 <tr>
 
 
 
 
 
 
 <td class="subt">
 <div class="st2">
 <div class="isf">
 
 


 <span class="inst1"><a href="/p/closure-compiler/source/checkout">Checkout</a></span> &nbsp;
 <span class="inst2"><a href="/p/closure-compiler/source/browse/">Browse</a></span> &nbsp;
 <span class="inst3"><a href="/p/closure-compiler/source/list">Changes</a></span> &nbsp;
 
 &nbsp;
 
 
 <form action="/p/closure-compiler/source/search" method="get" style="display:inline"
 onsubmit="document.getElementById('codesearchq').value = document.getElementById('origq').value">
 <input type="hidden" name="q" id="codesearchq" value="">
 <input type="text" maxlength="2048" size="38" id="origq" name="origq" value="" title="Google Code Search" style="font-size:92%">&nbsp;<input type="submit" value="Search Trunk" name="btnG" style="font-size:92%">
 
 
 
 
 
 
 </form>
 <script type="text/javascript">
 
 function codesearchQuery(form) {
 var query = document.getElementById('q').value;
 if (query) { form.action += '%20' + query; }
 }
 </script>
 </div>
</div>

 </td>
 
 
 
 <td align="right" valign="top" class="bevel-right"></td>
 </tr>
</table>


<script type="text/javascript">
 var cancelBubble = false;
 function _go(url) { document.location = url; }
</script>
<div id="maincol"
 
>

 




<div class="expand">
<div id="colcontrol">
<style type="text/css">
 #file_flipper { white-space: nowrap; padding-right: 2em; }
 #file_flipper.hidden { display: none; }
 #file_flipper .pagelink { color: #0000CC; text-decoration: underline; }
 #file_flipper #visiblefiles { padding-left: 0.5em; padding-right: 0.5em; }
</style>
<table id="nav_and_rev" class="list"
 cellpadding="0" cellspacing="0" width="100%">
 <tr>
 
 <td nowrap="nowrap" class="src_crumbs src_nav" width="33%">
 <strong class="src_nav">Source path:&nbsp;</strong>
 <span id="crumb_root">
 
 <a href="/p/closure-compiler/source/browse/">svn</a>/&nbsp;</span>
 <span id="crumb_links" class="ifClosed"><a href="/p/closure-compiler/source/browse/trunk/">trunk</a><span class="sp">/&nbsp;</span><a href="/p/closure-compiler/source/browse/trunk/contrib/">contrib</a><span class="sp">/&nbsp;</span><a href="/p/closure-compiler/source/browse/trunk/contrib/externs/">externs</a><span class="sp">/&nbsp;</span>underscore-1.3.1.js</span>
 
 


 </td>
 
 
 <td nowrap="nowrap" width="33%" align="center">
 <a href="/p/closure-compiler/source/browse/trunk/contrib/externs/underscore-1.3.1.js?edit=1"
 ><img src="http://www.gstatic.com/codesite/ph/images/pencil-y14.png"
 class="edit_icon">Edit file</a>
 </td>
 
 
 <td nowrap="nowrap" width="33%" align="right">
 <table cellpadding="0" cellspacing="0" style="font-size: 100%"><tr>
 
 
 <td class="flipper"><b>r2412</b></td>
 
 </tr></table>
 </td> 
 </tr>
</table>

<div class="fc">
 
 
 
<style type="text/css">
.undermouse span {
 background-image: url(http://www.gstatic.com/codesite/ph/images/comments.gif); }
</style>
<table class="opened" id="review_comment_area"
><tr>
<td id="nums">
<pre><table width="100%"><tr class="nocursor"><td></td></tr></table></pre>
<pre><table width="100%" id="nums_table_0"><tr id="gr_svn2412_1"

><td id="1"><a href="#1">1</a></td></tr
><tr id="gr_svn2412_2"

><td id="2"><a href="#2">2</a></td></tr
><tr id="gr_svn2412_3"

><td id="3"><a href="#3">3</a></td></tr
><tr id="gr_svn2412_4"

><td id="4"><a href="#4">4</a></td></tr
><tr id="gr_svn2412_5"

><td id="5"><a href="#5">5</a></td></tr
><tr id="gr_svn2412_6"

><td id="6"><a href="#6">6</a></td></tr
><tr id="gr_svn2412_7"

><td id="7"><a href="#7">7</a></td></tr
><tr id="gr_svn2412_8"

><td id="8"><a href="#8">8</a></td></tr
><tr id="gr_svn2412_9"

><td id="9"><a href="#9">9</a></td></tr
><tr id="gr_svn2412_10"

><td id="10"><a href="#10">10</a></td></tr
><tr id="gr_svn2412_11"

><td id="11"><a href="#11">11</a></td></tr
><tr id="gr_svn2412_12"

><td id="12"><a href="#12">12</a></td></tr
><tr id="gr_svn2412_13"

><td id="13"><a href="#13">13</a></td></tr
><tr id="gr_svn2412_14"

><td id="14"><a href="#14">14</a></td></tr
><tr id="gr_svn2412_15"

><td id="15"><a href="#15">15</a></td></tr
><tr id="gr_svn2412_16"

><td id="16"><a href="#16">16</a></td></tr
><tr id="gr_svn2412_17"

><td id="17"><a href="#17">17</a></td></tr
><tr id="gr_svn2412_18"

><td id="18"><a href="#18">18</a></td></tr
><tr id="gr_svn2412_19"

><td id="19"><a href="#19">19</a></td></tr
><tr id="gr_svn2412_20"

><td id="20"><a href="#20">20</a></td></tr
><tr id="gr_svn2412_21"

><td id="21"><a href="#21">21</a></td></tr
><tr id="gr_svn2412_22"

><td id="22"><a href="#22">22</a></td></tr
><tr id="gr_svn2412_23"

><td id="23"><a href="#23">23</a></td></tr
><tr id="gr_svn2412_24"

><td id="24"><a href="#24">24</a></td></tr
><tr id="gr_svn2412_25"

><td id="25"><a href="#25">25</a></td></tr
><tr id="gr_svn2412_26"

><td id="26"><a href="#26">26</a></td></tr
><tr id="gr_svn2412_27"

><td id="27"><a href="#27">27</a></td></tr
><tr id="gr_svn2412_28"

><td id="28"><a href="#28">28</a></td></tr
><tr id="gr_svn2412_29"

><td id="29"><a href="#29">29</a></td></tr
><tr id="gr_svn2412_30"

><td id="30"><a href="#30">30</a></td></tr
><tr id="gr_svn2412_31"

><td id="31"><a href="#31">31</a></td></tr
><tr id="gr_svn2412_32"

><td id="32"><a href="#32">32</a></td></tr
><tr id="gr_svn2412_33"

><td id="33"><a href="#33">33</a></td></tr
><tr id="gr_svn2412_34"

><td id="34"><a href="#34">34</a></td></tr
><tr id="gr_svn2412_35"

><td id="35"><a href="#35">35</a></td></tr
><tr id="gr_svn2412_36"

><td id="36"><a href="#36">36</a></td></tr
><tr id="gr_svn2412_37"

><td id="37"><a href="#37">37</a></td></tr
><tr id="gr_svn2412_38"

><td id="38"><a href="#38">38</a></td></tr
><tr id="gr_svn2412_39"

><td id="39"><a href="#39">39</a></td></tr
><tr id="gr_svn2412_40"

><td id="40"><a href="#40">40</a></td></tr
><tr id="gr_svn2412_41"

><td id="41"><a href="#41">41</a></td></tr
><tr id="gr_svn2412_42"

><td id="42"><a href="#42">42</a></td></tr
><tr id="gr_svn2412_43"

><td id="43"><a href="#43">43</a></td></tr
><tr id="gr_svn2412_44"

><td id="44"><a href="#44">44</a></td></tr
><tr id="gr_svn2412_45"

><td id="45"><a href="#45">45</a></td></tr
><tr id="gr_svn2412_46"

><td id="46"><a href="#46">46</a></td></tr
><tr id="gr_svn2412_47"

><td id="47"><a href="#47">47</a></td></tr
><tr id="gr_svn2412_48"

><td id="48"><a href="#48">48</a></td></tr
><tr id="gr_svn2412_49"

><td id="49"><a href="#49">49</a></td></tr
><tr id="gr_svn2412_50"

><td id="50"><a href="#50">50</a></td></tr
><tr id="gr_svn2412_51"

><td id="51"><a href="#51">51</a></td></tr
><tr id="gr_svn2412_52"

><td id="52"><a href="#52">52</a></td></tr
><tr id="gr_svn2412_53"

><td id="53"><a href="#53">53</a></td></tr
><tr id="gr_svn2412_54"

><td id="54"><a href="#54">54</a></td></tr
><tr id="gr_svn2412_55"

><td id="55"><a href="#55">55</a></td></tr
><tr id="gr_svn2412_56"

><td id="56"><a href="#56">56</a></td></tr
><tr id="gr_svn2412_57"

><td id="57"><a href="#57">57</a></td></tr
><tr id="gr_svn2412_58"

><td id="58"><a href="#58">58</a></td></tr
><tr id="gr_svn2412_59"

><td id="59"><a href="#59">59</a></td></tr
><tr id="gr_svn2412_60"

><td id="60"><a href="#60">60</a></td></tr
><tr id="gr_svn2412_61"

><td id="61"><a href="#61">61</a></td></tr
><tr id="gr_svn2412_62"

><td id="62"><a href="#62">62</a></td></tr
><tr id="gr_svn2412_63"

><td id="63"><a href="#63">63</a></td></tr
><tr id="gr_svn2412_64"

><td id="64"><a href="#64">64</a></td></tr
><tr id="gr_svn2412_65"

><td id="65"><a href="#65">65</a></td></tr
><tr id="gr_svn2412_66"

><td id="66"><a href="#66">66</a></td></tr
><tr id="gr_svn2412_67"

><td id="67"><a href="#67">67</a></td></tr
><tr id="gr_svn2412_68"

><td id="68"><a href="#68">68</a></td></tr
><tr id="gr_svn2412_69"

><td id="69"><a href="#69">69</a></td></tr
><tr id="gr_svn2412_70"

><td id="70"><a href="#70">70</a></td></tr
><tr id="gr_svn2412_71"

><td id="71"><a href="#71">71</a></td></tr
><tr id="gr_svn2412_72"

><td id="72"><a href="#72">72</a></td></tr
><tr id="gr_svn2412_73"

><td id="73"><a href="#73">73</a></td></tr
><tr id="gr_svn2412_74"

><td id="74"><a href="#74">74</a></td></tr
><tr id="gr_svn2412_75"

><td id="75"><a href="#75">75</a></td></tr
><tr id="gr_svn2412_76"

><td id="76"><a href="#76">76</a></td></tr
><tr id="gr_svn2412_77"

><td id="77"><a href="#77">77</a></td></tr
><tr id="gr_svn2412_78"

><td id="78"><a href="#78">78</a></td></tr
><tr id="gr_svn2412_79"

><td id="79"><a href="#79">79</a></td></tr
><tr id="gr_svn2412_80"

><td id="80"><a href="#80">80</a></td></tr
><tr id="gr_svn2412_81"

><td id="81"><a href="#81">81</a></td></tr
><tr id="gr_svn2412_82"

><td id="82"><a href="#82">82</a></td></tr
><tr id="gr_svn2412_83"

><td id="83"><a href="#83">83</a></td></tr
><tr id="gr_svn2412_84"

><td id="84"><a href="#84">84</a></td></tr
><tr id="gr_svn2412_85"

><td id="85"><a href="#85">85</a></td></tr
><tr id="gr_svn2412_86"

><td id="86"><a href="#86">86</a></td></tr
><tr id="gr_svn2412_87"

><td id="87"><a href="#87">87</a></td></tr
><tr id="gr_svn2412_88"

><td id="88"><a href="#88">88</a></td></tr
><tr id="gr_svn2412_89"

><td id="89"><a href="#89">89</a></td></tr
><tr id="gr_svn2412_90"

><td id="90"><a href="#90">90</a></td></tr
><tr id="gr_svn2412_91"

><td id="91"><a href="#91">91</a></td></tr
><tr id="gr_svn2412_92"

><td id="92"><a href="#92">92</a></td></tr
><tr id="gr_svn2412_93"

><td id="93"><a href="#93">93</a></td></tr
><tr id="gr_svn2412_94"

><td id="94"><a href="#94">94</a></td></tr
><tr id="gr_svn2412_95"

><td id="95"><a href="#95">95</a></td></tr
><tr id="gr_svn2412_96"

><td id="96"><a href="#96">96</a></td></tr
><tr id="gr_svn2412_97"

><td id="97"><a href="#97">97</a></td></tr
><tr id="gr_svn2412_98"

><td id="98"><a href="#98">98</a></td></tr
><tr id="gr_svn2412_99"

><td id="99"><a href="#99">99</a></td></tr
><tr id="gr_svn2412_100"

><td id="100"><a href="#100">100</a></td></tr
><tr id="gr_svn2412_101"

><td id="101"><a href="#101">101</a></td></tr
><tr id="gr_svn2412_102"

><td id="102"><a href="#102">102</a></td></tr
><tr id="gr_svn2412_103"

><td id="103"><a href="#103">103</a></td></tr
><tr id="gr_svn2412_104"

><td id="104"><a href="#104">104</a></td></tr
><tr id="gr_svn2412_105"

><td id="105"><a href="#105">105</a></td></tr
><tr id="gr_svn2412_106"

><td id="106"><a href="#106">106</a></td></tr
><tr id="gr_svn2412_107"

><td id="107"><a href="#107">107</a></td></tr
><tr id="gr_svn2412_108"

><td id="108"><a href="#108">108</a></td></tr
><tr id="gr_svn2412_109"

><td id="109"><a href="#109">109</a></td></tr
><tr id="gr_svn2412_110"

><td id="110"><a href="#110">110</a></td></tr
><tr id="gr_svn2412_111"

><td id="111"><a href="#111">111</a></td></tr
><tr id="gr_svn2412_112"

><td id="112"><a href="#112">112</a></td></tr
><tr id="gr_svn2412_113"

><td id="113"><a href="#113">113</a></td></tr
><tr id="gr_svn2412_114"

><td id="114"><a href="#114">114</a></td></tr
><tr id="gr_svn2412_115"

><td id="115"><a href="#115">115</a></td></tr
><tr id="gr_svn2412_116"

><td id="116"><a href="#116">116</a></td></tr
><tr id="gr_svn2412_117"

><td id="117"><a href="#117">117</a></td></tr
><tr id="gr_svn2412_118"

><td id="118"><a href="#118">118</a></td></tr
><tr id="gr_svn2412_119"

><td id="119"><a href="#119">119</a></td></tr
><tr id="gr_svn2412_120"

><td id="120"><a href="#120">120</a></td></tr
><tr id="gr_svn2412_121"

><td id="121"><a href="#121">121</a></td></tr
><tr id="gr_svn2412_122"

><td id="122"><a href="#122">122</a></td></tr
><tr id="gr_svn2412_123"

><td id="123"><a href="#123">123</a></td></tr
><tr id="gr_svn2412_124"

><td id="124"><a href="#124">124</a></td></tr
><tr id="gr_svn2412_125"

><td id="125"><a href="#125">125</a></td></tr
><tr id="gr_svn2412_126"

><td id="126"><a href="#126">126</a></td></tr
><tr id="gr_svn2412_127"

><td id="127"><a href="#127">127</a></td></tr
><tr id="gr_svn2412_128"

><td id="128"><a href="#128">128</a></td></tr
><tr id="gr_svn2412_129"

><td id="129"><a href="#129">129</a></td></tr
><tr id="gr_svn2412_130"

><td id="130"><a href="#130">130</a></td></tr
><tr id="gr_svn2412_131"

><td id="131"><a href="#131">131</a></td></tr
><tr id="gr_svn2412_132"

><td id="132"><a href="#132">132</a></td></tr
><tr id="gr_svn2412_133"

><td id="133"><a href="#133">133</a></td></tr
><tr id="gr_svn2412_134"

><td id="134"><a href="#134">134</a></td></tr
><tr id="gr_svn2412_135"

><td id="135"><a href="#135">135</a></td></tr
><tr id="gr_svn2412_136"

><td id="136"><a href="#136">136</a></td></tr
><tr id="gr_svn2412_137"

><td id="137"><a href="#137">137</a></td></tr
><tr id="gr_svn2412_138"

><td id="138"><a href="#138">138</a></td></tr
><tr id="gr_svn2412_139"

><td id="139"><a href="#139">139</a></td></tr
><tr id="gr_svn2412_140"

><td id="140"><a href="#140">140</a></td></tr
><tr id="gr_svn2412_141"

><td id="141"><a href="#141">141</a></td></tr
><tr id="gr_svn2412_142"

><td id="142"><a href="#142">142</a></td></tr
><tr id="gr_svn2412_143"

><td id="143"><a href="#143">143</a></td></tr
><tr id="gr_svn2412_144"

><td id="144"><a href="#144">144</a></td></tr
><tr id="gr_svn2412_145"

><td id="145"><a href="#145">145</a></td></tr
><tr id="gr_svn2412_146"

><td id="146"><a href="#146">146</a></td></tr
><tr id="gr_svn2412_147"

><td id="147"><a href="#147">147</a></td></tr
><tr id="gr_svn2412_148"

><td id="148"><a href="#148">148</a></td></tr
><tr id="gr_svn2412_149"

><td id="149"><a href="#149">149</a></td></tr
><tr id="gr_svn2412_150"

><td id="150"><a href="#150">150</a></td></tr
><tr id="gr_svn2412_151"

><td id="151"><a href="#151">151</a></td></tr
><tr id="gr_svn2412_152"

><td id="152"><a href="#152">152</a></td></tr
><tr id="gr_svn2412_153"

><td id="153"><a href="#153">153</a></td></tr
><tr id="gr_svn2412_154"

><td id="154"><a href="#154">154</a></td></tr
><tr id="gr_svn2412_155"

><td id="155"><a href="#155">155</a></td></tr
><tr id="gr_svn2412_156"

><td id="156"><a href="#156">156</a></td></tr
><tr id="gr_svn2412_157"

><td id="157"><a href="#157">157</a></td></tr
><tr id="gr_svn2412_158"

><td id="158"><a href="#158">158</a></td></tr
><tr id="gr_svn2412_159"

><td id="159"><a href="#159">159</a></td></tr
><tr id="gr_svn2412_160"

><td id="160"><a href="#160">160</a></td></tr
><tr id="gr_svn2412_161"

><td id="161"><a href="#161">161</a></td></tr
><tr id="gr_svn2412_162"

><td id="162"><a href="#162">162</a></td></tr
><tr id="gr_svn2412_163"

><td id="163"><a href="#163">163</a></td></tr
><tr id="gr_svn2412_164"

><td id="164"><a href="#164">164</a></td></tr
><tr id="gr_svn2412_165"

><td id="165"><a href="#165">165</a></td></tr
><tr id="gr_svn2412_166"

><td id="166"><a href="#166">166</a></td></tr
><tr id="gr_svn2412_167"

><td id="167"><a href="#167">167</a></td></tr
><tr id="gr_svn2412_168"

><td id="168"><a href="#168">168</a></td></tr
><tr id="gr_svn2412_169"

><td id="169"><a href="#169">169</a></td></tr
><tr id="gr_svn2412_170"

><td id="170"><a href="#170">170</a></td></tr
><tr id="gr_svn2412_171"

><td id="171"><a href="#171">171</a></td></tr
><tr id="gr_svn2412_172"

><td id="172"><a href="#172">172</a></td></tr
><tr id="gr_svn2412_173"

><td id="173"><a href="#173">173</a></td></tr
><tr id="gr_svn2412_174"

><td id="174"><a href="#174">174</a></td></tr
><tr id="gr_svn2412_175"

><td id="175"><a href="#175">175</a></td></tr
><tr id="gr_svn2412_176"

><td id="176"><a href="#176">176</a></td></tr
><tr id="gr_svn2412_177"

><td id="177"><a href="#177">177</a></td></tr
><tr id="gr_svn2412_178"

><td id="178"><a href="#178">178</a></td></tr
><tr id="gr_svn2412_179"

><td id="179"><a href="#179">179</a></td></tr
><tr id="gr_svn2412_180"

><td id="180"><a href="#180">180</a></td></tr
><tr id="gr_svn2412_181"

><td id="181"><a href="#181">181</a></td></tr
><tr id="gr_svn2412_182"

><td id="182"><a href="#182">182</a></td></tr
><tr id="gr_svn2412_183"

><td id="183"><a href="#183">183</a></td></tr
><tr id="gr_svn2412_184"

><td id="184"><a href="#184">184</a></td></tr
><tr id="gr_svn2412_185"

><td id="185"><a href="#185">185</a></td></tr
><tr id="gr_svn2412_186"

><td id="186"><a href="#186">186</a></td></tr
><tr id="gr_svn2412_187"

><td id="187"><a href="#187">187</a></td></tr
><tr id="gr_svn2412_188"

><td id="188"><a href="#188">188</a></td></tr
><tr id="gr_svn2412_189"

><td id="189"><a href="#189">189</a></td></tr
><tr id="gr_svn2412_190"

><td id="190"><a href="#190">190</a></td></tr
><tr id="gr_svn2412_191"

><td id="191"><a href="#191">191</a></td></tr
><tr id="gr_svn2412_192"

><td id="192"><a href="#192">192</a></td></tr
><tr id="gr_svn2412_193"

><td id="193"><a href="#193">193</a></td></tr
><tr id="gr_svn2412_194"

><td id="194"><a href="#194">194</a></td></tr
><tr id="gr_svn2412_195"

><td id="195"><a href="#195">195</a></td></tr
><tr id="gr_svn2412_196"

><td id="196"><a href="#196">196</a></td></tr
><tr id="gr_svn2412_197"

><td id="197"><a href="#197">197</a></td></tr
><tr id="gr_svn2412_198"

><td id="198"><a href="#198">198</a></td></tr
><tr id="gr_svn2412_199"

><td id="199"><a href="#199">199</a></td></tr
><tr id="gr_svn2412_200"

><td id="200"><a href="#200">200</a></td></tr
><tr id="gr_svn2412_201"

><td id="201"><a href="#201">201</a></td></tr
><tr id="gr_svn2412_202"

><td id="202"><a href="#202">202</a></td></tr
><tr id="gr_svn2412_203"

><td id="203"><a href="#203">203</a></td></tr
><tr id="gr_svn2412_204"

><td id="204"><a href="#204">204</a></td></tr
><tr id="gr_svn2412_205"

><td id="205"><a href="#205">205</a></td></tr
><tr id="gr_svn2412_206"

><td id="206"><a href="#206">206</a></td></tr
><tr id="gr_svn2412_207"

><td id="207"><a href="#207">207</a></td></tr
><tr id="gr_svn2412_208"

><td id="208"><a href="#208">208</a></td></tr
><tr id="gr_svn2412_209"

><td id="209"><a href="#209">209</a></td></tr
><tr id="gr_svn2412_210"

><td id="210"><a href="#210">210</a></td></tr
><tr id="gr_svn2412_211"

><td id="211"><a href="#211">211</a></td></tr
><tr id="gr_svn2412_212"

><td id="212"><a href="#212">212</a></td></tr
><tr id="gr_svn2412_213"

><td id="213"><a href="#213">213</a></td></tr
><tr id="gr_svn2412_214"

><td id="214"><a href="#214">214</a></td></tr
><tr id="gr_svn2412_215"

><td id="215"><a href="#215">215</a></td></tr
><tr id="gr_svn2412_216"

><td id="216"><a href="#216">216</a></td></tr
><tr id="gr_svn2412_217"

><td id="217"><a href="#217">217</a></td></tr
><tr id="gr_svn2412_218"

><td id="218"><a href="#218">218</a></td></tr
><tr id="gr_svn2412_219"

><td id="219"><a href="#219">219</a></td></tr
><tr id="gr_svn2412_220"

><td id="220"><a href="#220">220</a></td></tr
><tr id="gr_svn2412_221"

><td id="221"><a href="#221">221</a></td></tr
><tr id="gr_svn2412_222"

><td id="222"><a href="#222">222</a></td></tr
><tr id="gr_svn2412_223"

><td id="223"><a href="#223">223</a></td></tr
><tr id="gr_svn2412_224"

><td id="224"><a href="#224">224</a></td></tr
><tr id="gr_svn2412_225"

><td id="225"><a href="#225">225</a></td></tr
><tr id="gr_svn2412_226"

><td id="226"><a href="#226">226</a></td></tr
><tr id="gr_svn2412_227"

><td id="227"><a href="#227">227</a></td></tr
><tr id="gr_svn2412_228"

><td id="228"><a href="#228">228</a></td></tr
><tr id="gr_svn2412_229"

><td id="229"><a href="#229">229</a></td></tr
><tr id="gr_svn2412_230"

><td id="230"><a href="#230">230</a></td></tr
><tr id="gr_svn2412_231"

><td id="231"><a href="#231">231</a></td></tr
><tr id="gr_svn2412_232"

><td id="232"><a href="#232">232</a></td></tr
><tr id="gr_svn2412_233"

><td id="233"><a href="#233">233</a></td></tr
><tr id="gr_svn2412_234"

><td id="234"><a href="#234">234</a></td></tr
><tr id="gr_svn2412_235"

><td id="235"><a href="#235">235</a></td></tr
><tr id="gr_svn2412_236"

><td id="236"><a href="#236">236</a></td></tr
><tr id="gr_svn2412_237"

><td id="237"><a href="#237">237</a></td></tr
><tr id="gr_svn2412_238"

><td id="238"><a href="#238">238</a></td></tr
><tr id="gr_svn2412_239"

><td id="239"><a href="#239">239</a></td></tr
><tr id="gr_svn2412_240"

><td id="240"><a href="#240">240</a></td></tr
><tr id="gr_svn2412_241"

><td id="241"><a href="#241">241</a></td></tr
><tr id="gr_svn2412_242"

><td id="242"><a href="#242">242</a></td></tr
><tr id="gr_svn2412_243"

><td id="243"><a href="#243">243</a></td></tr
><tr id="gr_svn2412_244"

><td id="244"><a href="#244">244</a></td></tr
><tr id="gr_svn2412_245"

><td id="245"><a href="#245">245</a></td></tr
><tr id="gr_svn2412_246"

><td id="246"><a href="#246">246</a></td></tr
><tr id="gr_svn2412_247"

><td id="247"><a href="#247">247</a></td></tr
><tr id="gr_svn2412_248"

><td id="248"><a href="#248">248</a></td></tr
><tr id="gr_svn2412_249"

><td id="249"><a href="#249">249</a></td></tr
><tr id="gr_svn2412_250"

><td id="250"><a href="#250">250</a></td></tr
><tr id="gr_svn2412_251"

><td id="251"><a href="#251">251</a></td></tr
><tr id="gr_svn2412_252"

><td id="252"><a href="#252">252</a></td></tr
><tr id="gr_svn2412_253"

><td id="253"><a href="#253">253</a></td></tr
><tr id="gr_svn2412_254"

><td id="254"><a href="#254">254</a></td></tr
><tr id="gr_svn2412_255"

><td id="255"><a href="#255">255</a></td></tr
><tr id="gr_svn2412_256"

><td id="256"><a href="#256">256</a></td></tr
><tr id="gr_svn2412_257"

><td id="257"><a href="#257">257</a></td></tr
><tr id="gr_svn2412_258"

><td id="258"><a href="#258">258</a></td></tr
><tr id="gr_svn2412_259"

><td id="259"><a href="#259">259</a></td></tr
><tr id="gr_svn2412_260"

><td id="260"><a href="#260">260</a></td></tr
><tr id="gr_svn2412_261"

><td id="261"><a href="#261">261</a></td></tr
><tr id="gr_svn2412_262"

><td id="262"><a href="#262">262</a></td></tr
><tr id="gr_svn2412_263"

><td id="263"><a href="#263">263</a></td></tr
><tr id="gr_svn2412_264"

><td id="264"><a href="#264">264</a></td></tr
><tr id="gr_svn2412_265"

><td id="265"><a href="#265">265</a></td></tr
><tr id="gr_svn2412_266"

><td id="266"><a href="#266">266</a></td></tr
><tr id="gr_svn2412_267"

><td id="267"><a href="#267">267</a></td></tr
><tr id="gr_svn2412_268"

><td id="268"><a href="#268">268</a></td></tr
><tr id="gr_svn2412_269"

><td id="269"><a href="#269">269</a></td></tr
><tr id="gr_svn2412_270"

><td id="270"><a href="#270">270</a></td></tr
><tr id="gr_svn2412_271"

><td id="271"><a href="#271">271</a></td></tr
><tr id="gr_svn2412_272"

><td id="272"><a href="#272">272</a></td></tr
><tr id="gr_svn2412_273"

><td id="273"><a href="#273">273</a></td></tr
><tr id="gr_svn2412_274"

><td id="274"><a href="#274">274</a></td></tr
><tr id="gr_svn2412_275"

><td id="275"><a href="#275">275</a></td></tr
><tr id="gr_svn2412_276"

><td id="276"><a href="#276">276</a></td></tr
><tr id="gr_svn2412_277"

><td id="277"><a href="#277">277</a></td></tr
><tr id="gr_svn2412_278"

><td id="278"><a href="#278">278</a></td></tr
><tr id="gr_svn2412_279"

><td id="279"><a href="#279">279</a></td></tr
><tr id="gr_svn2412_280"

><td id="280"><a href="#280">280</a></td></tr
><tr id="gr_svn2412_281"

><td id="281"><a href="#281">281</a></td></tr
><tr id="gr_svn2412_282"

><td id="282"><a href="#282">282</a></td></tr
><tr id="gr_svn2412_283"

><td id="283"><a href="#283">283</a></td></tr
><tr id="gr_svn2412_284"

><td id="284"><a href="#284">284</a></td></tr
><tr id="gr_svn2412_285"

><td id="285"><a href="#285">285</a></td></tr
><tr id="gr_svn2412_286"

><td id="286"><a href="#286">286</a></td></tr
><tr id="gr_svn2412_287"

><td id="287"><a href="#287">287</a></td></tr
><tr id="gr_svn2412_288"

><td id="288"><a href="#288">288</a></td></tr
><tr id="gr_svn2412_289"

><td id="289"><a href="#289">289</a></td></tr
><tr id="gr_svn2412_290"

><td id="290"><a href="#290">290</a></td></tr
><tr id="gr_svn2412_291"

><td id="291"><a href="#291">291</a></td></tr
><tr id="gr_svn2412_292"

><td id="292"><a href="#292">292</a></td></tr
><tr id="gr_svn2412_293"

><td id="293"><a href="#293">293</a></td></tr
><tr id="gr_svn2412_294"

><td id="294"><a href="#294">294</a></td></tr
><tr id="gr_svn2412_295"

><td id="295"><a href="#295">295</a></td></tr
><tr id="gr_svn2412_296"

><td id="296"><a href="#296">296</a></td></tr
><tr id="gr_svn2412_297"

><td id="297"><a href="#297">297</a></td></tr
><tr id="gr_svn2412_298"

><td id="298"><a href="#298">298</a></td></tr
><tr id="gr_svn2412_299"

><td id="299"><a href="#299">299</a></td></tr
><tr id="gr_svn2412_300"

><td id="300"><a href="#300">300</a></td></tr
><tr id="gr_svn2412_301"

><td id="301"><a href="#301">301</a></td></tr
><tr id="gr_svn2412_302"

><td id="302"><a href="#302">302</a></td></tr
><tr id="gr_svn2412_303"

><td id="303"><a href="#303">303</a></td></tr
><tr id="gr_svn2412_304"

><td id="304"><a href="#304">304</a></td></tr
><tr id="gr_svn2412_305"

><td id="305"><a href="#305">305</a></td></tr
><tr id="gr_svn2412_306"

><td id="306"><a href="#306">306</a></td></tr
><tr id="gr_svn2412_307"

><td id="307"><a href="#307">307</a></td></tr
><tr id="gr_svn2412_308"

><td id="308"><a href="#308">308</a></td></tr
><tr id="gr_svn2412_309"

><td id="309"><a href="#309">309</a></td></tr
><tr id="gr_svn2412_310"

><td id="310"><a href="#310">310</a></td></tr
><tr id="gr_svn2412_311"

><td id="311"><a href="#311">311</a></td></tr
><tr id="gr_svn2412_312"

><td id="312"><a href="#312">312</a></td></tr
><tr id="gr_svn2412_313"

><td id="313"><a href="#313">313</a></td></tr
><tr id="gr_svn2412_314"

><td id="314"><a href="#314">314</a></td></tr
><tr id="gr_svn2412_315"

><td id="315"><a href="#315">315</a></td></tr
><tr id="gr_svn2412_316"

><td id="316"><a href="#316">316</a></td></tr
><tr id="gr_svn2412_317"

><td id="317"><a href="#317">317</a></td></tr
><tr id="gr_svn2412_318"

><td id="318"><a href="#318">318</a></td></tr
><tr id="gr_svn2412_319"

><td id="319"><a href="#319">319</a></td></tr
><tr id="gr_svn2412_320"

><td id="320"><a href="#320">320</a></td></tr
><tr id="gr_svn2412_321"

><td id="321"><a href="#321">321</a></td></tr
><tr id="gr_svn2412_322"

><td id="322"><a href="#322">322</a></td></tr
><tr id="gr_svn2412_323"

><td id="323"><a href="#323">323</a></td></tr
><tr id="gr_svn2412_324"

><td id="324"><a href="#324">324</a></td></tr
><tr id="gr_svn2412_325"

><td id="325"><a href="#325">325</a></td></tr
><tr id="gr_svn2412_326"

><td id="326"><a href="#326">326</a></td></tr
><tr id="gr_svn2412_327"

><td id="327"><a href="#327">327</a></td></tr
><tr id="gr_svn2412_328"

><td id="328"><a href="#328">328</a></td></tr
><tr id="gr_svn2412_329"

><td id="329"><a href="#329">329</a></td></tr
><tr id="gr_svn2412_330"

><td id="330"><a href="#330">330</a></td></tr
><tr id="gr_svn2412_331"

><td id="331"><a href="#331">331</a></td></tr
><tr id="gr_svn2412_332"

><td id="332"><a href="#332">332</a></td></tr
><tr id="gr_svn2412_333"

><td id="333"><a href="#333">333</a></td></tr
><tr id="gr_svn2412_334"

><td id="334"><a href="#334">334</a></td></tr
><tr id="gr_svn2412_335"

><td id="335"><a href="#335">335</a></td></tr
><tr id="gr_svn2412_336"

><td id="336"><a href="#336">336</a></td></tr
><tr id="gr_svn2412_337"

><td id="337"><a href="#337">337</a></td></tr
><tr id="gr_svn2412_338"

><td id="338"><a href="#338">338</a></td></tr
><tr id="gr_svn2412_339"

><td id="339"><a href="#339">339</a></td></tr
><tr id="gr_svn2412_340"

><td id="340"><a href="#340">340</a></td></tr
><tr id="gr_svn2412_341"

><td id="341"><a href="#341">341</a></td></tr
><tr id="gr_svn2412_342"

><td id="342"><a href="#342">342</a></td></tr
><tr id="gr_svn2412_343"

><td id="343"><a href="#343">343</a></td></tr
><tr id="gr_svn2412_344"

><td id="344"><a href="#344">344</a></td></tr
><tr id="gr_svn2412_345"

><td id="345"><a href="#345">345</a></td></tr
><tr id="gr_svn2412_346"

><td id="346"><a href="#346">346</a></td></tr
><tr id="gr_svn2412_347"

><td id="347"><a href="#347">347</a></td></tr
><tr id="gr_svn2412_348"

><td id="348"><a href="#348">348</a></td></tr
><tr id="gr_svn2412_349"

><td id="349"><a href="#349">349</a></td></tr
><tr id="gr_svn2412_350"

><td id="350"><a href="#350">350</a></td></tr
><tr id="gr_svn2412_351"

><td id="351"><a href="#351">351</a></td></tr
><tr id="gr_svn2412_352"

><td id="352"><a href="#352">352</a></td></tr
><tr id="gr_svn2412_353"

><td id="353"><a href="#353">353</a></td></tr
><tr id="gr_svn2412_354"

><td id="354"><a href="#354">354</a></td></tr
><tr id="gr_svn2412_355"

><td id="355"><a href="#355">355</a></td></tr
><tr id="gr_svn2412_356"

><td id="356"><a href="#356">356</a></td></tr
><tr id="gr_svn2412_357"

><td id="357"><a href="#357">357</a></td></tr
><tr id="gr_svn2412_358"

><td id="358"><a href="#358">358</a></td></tr
><tr id="gr_svn2412_359"

><td id="359"><a href="#359">359</a></td></tr
><tr id="gr_svn2412_360"

><td id="360"><a href="#360">360</a></td></tr
><tr id="gr_svn2412_361"

><td id="361"><a href="#361">361</a></td></tr
><tr id="gr_svn2412_362"

><td id="362"><a href="#362">362</a></td></tr
><tr id="gr_svn2412_363"

><td id="363"><a href="#363">363</a></td></tr
><tr id="gr_svn2412_364"

><td id="364"><a href="#364">364</a></td></tr
><tr id="gr_svn2412_365"

><td id="365"><a href="#365">365</a></td></tr
><tr id="gr_svn2412_366"

><td id="366"><a href="#366">366</a></td></tr
><tr id="gr_svn2412_367"

><td id="367"><a href="#367">367</a></td></tr
><tr id="gr_svn2412_368"

><td id="368"><a href="#368">368</a></td></tr
><tr id="gr_svn2412_369"

><td id="369"><a href="#369">369</a></td></tr
><tr id="gr_svn2412_370"

><td id="370"><a href="#370">370</a></td></tr
><tr id="gr_svn2412_371"

><td id="371"><a href="#371">371</a></td></tr
><tr id="gr_svn2412_372"

><td id="372"><a href="#372">372</a></td></tr
><tr id="gr_svn2412_373"

><td id="373"><a href="#373">373</a></td></tr
><tr id="gr_svn2412_374"

><td id="374"><a href="#374">374</a></td></tr
><tr id="gr_svn2412_375"

><td id="375"><a href="#375">375</a></td></tr
><tr id="gr_svn2412_376"

><td id="376"><a href="#376">376</a></td></tr
><tr id="gr_svn2412_377"

><td id="377"><a href="#377">377</a></td></tr
><tr id="gr_svn2412_378"

><td id="378"><a href="#378">378</a></td></tr
><tr id="gr_svn2412_379"

><td id="379"><a href="#379">379</a></td></tr
><tr id="gr_svn2412_380"

><td id="380"><a href="#380">380</a></td></tr
><tr id="gr_svn2412_381"

><td id="381"><a href="#381">381</a></td></tr
><tr id="gr_svn2412_382"

><td id="382"><a href="#382">382</a></td></tr
><tr id="gr_svn2412_383"

><td id="383"><a href="#383">383</a></td></tr
><tr id="gr_svn2412_384"

><td id="384"><a href="#384">384</a></td></tr
><tr id="gr_svn2412_385"

><td id="385"><a href="#385">385</a></td></tr
><tr id="gr_svn2412_386"

><td id="386"><a href="#386">386</a></td></tr
><tr id="gr_svn2412_387"

><td id="387"><a href="#387">387</a></td></tr
><tr id="gr_svn2412_388"

><td id="388"><a href="#388">388</a></td></tr
><tr id="gr_svn2412_389"

><td id="389"><a href="#389">389</a></td></tr
><tr id="gr_svn2412_390"

><td id="390"><a href="#390">390</a></td></tr
><tr id="gr_svn2412_391"

><td id="391"><a href="#391">391</a></td></tr
><tr id="gr_svn2412_392"

><td id="392"><a href="#392">392</a></td></tr
><tr id="gr_svn2412_393"

><td id="393"><a href="#393">393</a></td></tr
><tr id="gr_svn2412_394"

><td id="394"><a href="#394">394</a></td></tr
><tr id="gr_svn2412_395"

><td id="395"><a href="#395">395</a></td></tr
><tr id="gr_svn2412_396"

><td id="396"><a href="#396">396</a></td></tr
><tr id="gr_svn2412_397"

><td id="397"><a href="#397">397</a></td></tr
><tr id="gr_svn2412_398"

><td id="398"><a href="#398">398</a></td></tr
><tr id="gr_svn2412_399"

><td id="399"><a href="#399">399</a></td></tr
><tr id="gr_svn2412_400"

><td id="400"><a href="#400">400</a></td></tr
><tr id="gr_svn2412_401"

><td id="401"><a href="#401">401</a></td></tr
><tr id="gr_svn2412_402"

><td id="402"><a href="#402">402</a></td></tr
><tr id="gr_svn2412_403"

><td id="403"><a href="#403">403</a></td></tr
><tr id="gr_svn2412_404"

><td id="404"><a href="#404">404</a></td></tr
><tr id="gr_svn2412_405"

><td id="405"><a href="#405">405</a></td></tr
><tr id="gr_svn2412_406"

><td id="406"><a href="#406">406</a></td></tr
><tr id="gr_svn2412_407"

><td id="407"><a href="#407">407</a></td></tr
><tr id="gr_svn2412_408"

><td id="408"><a href="#408">408</a></td></tr
><tr id="gr_svn2412_409"

><td id="409"><a href="#409">409</a></td></tr
><tr id="gr_svn2412_410"

><td id="410"><a href="#410">410</a></td></tr
><tr id="gr_svn2412_411"

><td id="411"><a href="#411">411</a></td></tr
><tr id="gr_svn2412_412"

><td id="412"><a href="#412">412</a></td></tr
><tr id="gr_svn2412_413"

><td id="413"><a href="#413">413</a></td></tr
><tr id="gr_svn2412_414"

><td id="414"><a href="#414">414</a></td></tr
><tr id="gr_svn2412_415"

><td id="415"><a href="#415">415</a></td></tr
><tr id="gr_svn2412_416"

><td id="416"><a href="#416">416</a></td></tr
><tr id="gr_svn2412_417"

><td id="417"><a href="#417">417</a></td></tr
><tr id="gr_svn2412_418"

><td id="418"><a href="#418">418</a></td></tr
><tr id="gr_svn2412_419"

><td id="419"><a href="#419">419</a></td></tr
><tr id="gr_svn2412_420"

><td id="420"><a href="#420">420</a></td></tr
><tr id="gr_svn2412_421"

><td id="421"><a href="#421">421</a></td></tr
><tr id="gr_svn2412_422"

><td id="422"><a href="#422">422</a></td></tr
><tr id="gr_svn2412_423"

><td id="423"><a href="#423">423</a></td></tr
><tr id="gr_svn2412_424"

><td id="424"><a href="#424">424</a></td></tr
><tr id="gr_svn2412_425"

><td id="425"><a href="#425">425</a></td></tr
><tr id="gr_svn2412_426"

><td id="426"><a href="#426">426</a></td></tr
><tr id="gr_svn2412_427"

><td id="427"><a href="#427">427</a></td></tr
><tr id="gr_svn2412_428"

><td id="428"><a href="#428">428</a></td></tr
><tr id="gr_svn2412_429"

><td id="429"><a href="#429">429</a></td></tr
><tr id="gr_svn2412_430"

><td id="430"><a href="#430">430</a></td></tr
><tr id="gr_svn2412_431"

><td id="431"><a href="#431">431</a></td></tr
><tr id="gr_svn2412_432"

><td id="432"><a href="#432">432</a></td></tr
><tr id="gr_svn2412_433"

><td id="433"><a href="#433">433</a></td></tr
><tr id="gr_svn2412_434"

><td id="434"><a href="#434">434</a></td></tr
><tr id="gr_svn2412_435"

><td id="435"><a href="#435">435</a></td></tr
><tr id="gr_svn2412_436"

><td id="436"><a href="#436">436</a></td></tr
><tr id="gr_svn2412_437"

><td id="437"><a href="#437">437</a></td></tr
><tr id="gr_svn2412_438"

><td id="438"><a href="#438">438</a></td></tr
><tr id="gr_svn2412_439"

><td id="439"><a href="#439">439</a></td></tr
><tr id="gr_svn2412_440"

><td id="440"><a href="#440">440</a></td></tr
><tr id="gr_svn2412_441"

><td id="441"><a href="#441">441</a></td></tr
><tr id="gr_svn2412_442"

><td id="442"><a href="#442">442</a></td></tr
><tr id="gr_svn2412_443"

><td id="443"><a href="#443">443</a></td></tr
><tr id="gr_svn2412_444"

><td id="444"><a href="#444">444</a></td></tr
><tr id="gr_svn2412_445"

><td id="445"><a href="#445">445</a></td></tr
><tr id="gr_svn2412_446"

><td id="446"><a href="#446">446</a></td></tr
><tr id="gr_svn2412_447"

><td id="447"><a href="#447">447</a></td></tr
><tr id="gr_svn2412_448"

><td id="448"><a href="#448">448</a></td></tr
><tr id="gr_svn2412_449"

><td id="449"><a href="#449">449</a></td></tr
><tr id="gr_svn2412_450"

><td id="450"><a href="#450">450</a></td></tr
><tr id="gr_svn2412_451"

><td id="451"><a href="#451">451</a></td></tr
><tr id="gr_svn2412_452"

><td id="452"><a href="#452">452</a></td></tr
><tr id="gr_svn2412_453"

><td id="453"><a href="#453">453</a></td></tr
><tr id="gr_svn2412_454"

><td id="454"><a href="#454">454</a></td></tr
><tr id="gr_svn2412_455"

><td id="455"><a href="#455">455</a></td></tr
><tr id="gr_svn2412_456"

><td id="456"><a href="#456">456</a></td></tr
><tr id="gr_svn2412_457"

><td id="457"><a href="#457">457</a></td></tr
><tr id="gr_svn2412_458"

><td id="458"><a href="#458">458</a></td></tr
><tr id="gr_svn2412_459"

><td id="459"><a href="#459">459</a></td></tr
><tr id="gr_svn2412_460"

><td id="460"><a href="#460">460</a></td></tr
><tr id="gr_svn2412_461"

><td id="461"><a href="#461">461</a></td></tr
><tr id="gr_svn2412_462"

><td id="462"><a href="#462">462</a></td></tr
><tr id="gr_svn2412_463"

><td id="463"><a href="#463">463</a></td></tr
><tr id="gr_svn2412_464"

><td id="464"><a href="#464">464</a></td></tr
><tr id="gr_svn2412_465"

><td id="465"><a href="#465">465</a></td></tr
><tr id="gr_svn2412_466"

><td id="466"><a href="#466">466</a></td></tr
><tr id="gr_svn2412_467"

><td id="467"><a href="#467">467</a></td></tr
><tr id="gr_svn2412_468"

><td id="468"><a href="#468">468</a></td></tr
><tr id="gr_svn2412_469"

><td id="469"><a href="#469">469</a></td></tr
><tr id="gr_svn2412_470"

><td id="470"><a href="#470">470</a></td></tr
><tr id="gr_svn2412_471"

><td id="471"><a href="#471">471</a></td></tr
><tr id="gr_svn2412_472"

><td id="472"><a href="#472">472</a></td></tr
><tr id="gr_svn2412_473"

><td id="473"><a href="#473">473</a></td></tr
><tr id="gr_svn2412_474"

><td id="474"><a href="#474">474</a></td></tr
><tr id="gr_svn2412_475"

><td id="475"><a href="#475">475</a></td></tr
><tr id="gr_svn2412_476"

><td id="476"><a href="#476">476</a></td></tr
><tr id="gr_svn2412_477"

><td id="477"><a href="#477">477</a></td></tr
><tr id="gr_svn2412_478"

><td id="478"><a href="#478">478</a></td></tr
><tr id="gr_svn2412_479"

><td id="479"><a href="#479">479</a></td></tr
><tr id="gr_svn2412_480"

><td id="480"><a href="#480">480</a></td></tr
><tr id="gr_svn2412_481"

><td id="481"><a href="#481">481</a></td></tr
><tr id="gr_svn2412_482"

><td id="482"><a href="#482">482</a></td></tr
><tr id="gr_svn2412_483"

><td id="483"><a href="#483">483</a></td></tr
><tr id="gr_svn2412_484"

><td id="484"><a href="#484">484</a></td></tr
><tr id="gr_svn2412_485"

><td id="485"><a href="#485">485</a></td></tr
><tr id="gr_svn2412_486"

><td id="486"><a href="#486">486</a></td></tr
><tr id="gr_svn2412_487"

><td id="487"><a href="#487">487</a></td></tr
><tr id="gr_svn2412_488"

><td id="488"><a href="#488">488</a></td></tr
><tr id="gr_svn2412_489"

><td id="489"><a href="#489">489</a></td></tr
><tr id="gr_svn2412_490"

><td id="490"><a href="#490">490</a></td></tr
><tr id="gr_svn2412_491"

><td id="491"><a href="#491">491</a></td></tr
><tr id="gr_svn2412_492"

><td id="492"><a href="#492">492</a></td></tr
><tr id="gr_svn2412_493"

><td id="493"><a href="#493">493</a></td></tr
><tr id="gr_svn2412_494"

><td id="494"><a href="#494">494</a></td></tr
><tr id="gr_svn2412_495"

><td id="495"><a href="#495">495</a></td></tr
><tr id="gr_svn2412_496"

><td id="496"><a href="#496">496</a></td></tr
><tr id="gr_svn2412_497"

><td id="497"><a href="#497">497</a></td></tr
><tr id="gr_svn2412_498"

><td id="498"><a href="#498">498</a></td></tr
><tr id="gr_svn2412_499"

><td id="499"><a href="#499">499</a></td></tr
><tr id="gr_svn2412_500"

><td id="500"><a href="#500">500</a></td></tr
><tr id="gr_svn2412_501"

><td id="501"><a href="#501">501</a></td></tr
><tr id="gr_svn2412_502"

><td id="502"><a href="#502">502</a></td></tr
><tr id="gr_svn2412_503"

><td id="503"><a href="#503">503</a></td></tr
><tr id="gr_svn2412_504"

><td id="504"><a href="#504">504</a></td></tr
><tr id="gr_svn2412_505"

><td id="505"><a href="#505">505</a></td></tr
><tr id="gr_svn2412_506"

><td id="506"><a href="#506">506</a></td></tr
><tr id="gr_svn2412_507"

><td id="507"><a href="#507">507</a></td></tr
><tr id="gr_svn2412_508"

><td id="508"><a href="#508">508</a></td></tr
><tr id="gr_svn2412_509"

><td id="509"><a href="#509">509</a></td></tr
><tr id="gr_svn2412_510"

><td id="510"><a href="#510">510</a></td></tr
><tr id="gr_svn2412_511"

><td id="511"><a href="#511">511</a></td></tr
><tr id="gr_svn2412_512"

><td id="512"><a href="#512">512</a></td></tr
><tr id="gr_svn2412_513"

><td id="513"><a href="#513">513</a></td></tr
><tr id="gr_svn2412_514"

><td id="514"><a href="#514">514</a></td></tr
><tr id="gr_svn2412_515"

><td id="515"><a href="#515">515</a></td></tr
><tr id="gr_svn2412_516"

><td id="516"><a href="#516">516</a></td></tr
><tr id="gr_svn2412_517"

><td id="517"><a href="#517">517</a></td></tr
><tr id="gr_svn2412_518"

><td id="518"><a href="#518">518</a></td></tr
><tr id="gr_svn2412_519"

><td id="519"><a href="#519">519</a></td></tr
><tr id="gr_svn2412_520"

><td id="520"><a href="#520">520</a></td></tr
><tr id="gr_svn2412_521"

><td id="521"><a href="#521">521</a></td></tr
><tr id="gr_svn2412_522"

><td id="522"><a href="#522">522</a></td></tr
><tr id="gr_svn2412_523"

><td id="523"><a href="#523">523</a></td></tr
><tr id="gr_svn2412_524"

><td id="524"><a href="#524">524</a></td></tr
><tr id="gr_svn2412_525"

><td id="525"><a href="#525">525</a></td></tr
><tr id="gr_svn2412_526"

><td id="526"><a href="#526">526</a></td></tr
><tr id="gr_svn2412_527"

><td id="527"><a href="#527">527</a></td></tr
><tr id="gr_svn2412_528"

><td id="528"><a href="#528">528</a></td></tr
><tr id="gr_svn2412_529"

><td id="529"><a href="#529">529</a></td></tr
><tr id="gr_svn2412_530"

><td id="530"><a href="#530">530</a></td></tr
><tr id="gr_svn2412_531"

><td id="531"><a href="#531">531</a></td></tr
><tr id="gr_svn2412_532"

><td id="532"><a href="#532">532</a></td></tr
><tr id="gr_svn2412_533"

><td id="533"><a href="#533">533</a></td></tr
><tr id="gr_svn2412_534"

><td id="534"><a href="#534">534</a></td></tr
><tr id="gr_svn2412_535"

><td id="535"><a href="#535">535</a></td></tr
><tr id="gr_svn2412_536"

><td id="536"><a href="#536">536</a></td></tr
><tr id="gr_svn2412_537"

><td id="537"><a href="#537">537</a></td></tr
><tr id="gr_svn2412_538"

><td id="538"><a href="#538">538</a></td></tr
><tr id="gr_svn2412_539"

><td id="539"><a href="#539">539</a></td></tr
><tr id="gr_svn2412_540"

><td id="540"><a href="#540">540</a></td></tr
><tr id="gr_svn2412_541"

><td id="541"><a href="#541">541</a></td></tr
><tr id="gr_svn2412_542"

><td id="542"><a href="#542">542</a></td></tr
><tr id="gr_svn2412_543"

><td id="543"><a href="#543">543</a></td></tr
><tr id="gr_svn2412_544"

><td id="544"><a href="#544">544</a></td></tr
><tr id="gr_svn2412_545"

><td id="545"><a href="#545">545</a></td></tr
><tr id="gr_svn2412_546"

><td id="546"><a href="#546">546</a></td></tr
><tr id="gr_svn2412_547"

><td id="547"><a href="#547">547</a></td></tr
><tr id="gr_svn2412_548"

><td id="548"><a href="#548">548</a></td></tr
><tr id="gr_svn2412_549"

><td id="549"><a href="#549">549</a></td></tr
><tr id="gr_svn2412_550"

><td id="550"><a href="#550">550</a></td></tr
><tr id="gr_svn2412_551"

><td id="551"><a href="#551">551</a></td></tr
><tr id="gr_svn2412_552"

><td id="552"><a href="#552">552</a></td></tr
><tr id="gr_svn2412_553"

><td id="553"><a href="#553">553</a></td></tr
><tr id="gr_svn2412_554"

><td id="554"><a href="#554">554</a></td></tr
><tr id="gr_svn2412_555"

><td id="555"><a href="#555">555</a></td></tr
><tr id="gr_svn2412_556"

><td id="556"><a href="#556">556</a></td></tr
><tr id="gr_svn2412_557"

><td id="557"><a href="#557">557</a></td></tr
><tr id="gr_svn2412_558"

><td id="558"><a href="#558">558</a></td></tr
><tr id="gr_svn2412_559"

><td id="559"><a href="#559">559</a></td></tr
><tr id="gr_svn2412_560"

><td id="560"><a href="#560">560</a></td></tr
><tr id="gr_svn2412_561"

><td id="561"><a href="#561">561</a></td></tr
><tr id="gr_svn2412_562"

><td id="562"><a href="#562">562</a></td></tr
><tr id="gr_svn2412_563"

><td id="563"><a href="#563">563</a></td></tr
><tr id="gr_svn2412_564"

><td id="564"><a href="#564">564</a></td></tr
><tr id="gr_svn2412_565"

><td id="565"><a href="#565">565</a></td></tr
><tr id="gr_svn2412_566"

><td id="566"><a href="#566">566</a></td></tr
><tr id="gr_svn2412_567"

><td id="567"><a href="#567">567</a></td></tr
><tr id="gr_svn2412_568"

><td id="568"><a href="#568">568</a></td></tr
><tr id="gr_svn2412_569"

><td id="569"><a href="#569">569</a></td></tr
><tr id="gr_svn2412_570"

><td id="570"><a href="#570">570</a></td></tr
><tr id="gr_svn2412_571"

><td id="571"><a href="#571">571</a></td></tr
><tr id="gr_svn2412_572"

><td id="572"><a href="#572">572</a></td></tr
><tr id="gr_svn2412_573"

><td id="573"><a href="#573">573</a></td></tr
><tr id="gr_svn2412_574"

><td id="574"><a href="#574">574</a></td></tr
><tr id="gr_svn2412_575"

><td id="575"><a href="#575">575</a></td></tr
><tr id="gr_svn2412_576"

><td id="576"><a href="#576">576</a></td></tr
><tr id="gr_svn2412_577"

><td id="577"><a href="#577">577</a></td></tr
><tr id="gr_svn2412_578"

><td id="578"><a href="#578">578</a></td></tr
><tr id="gr_svn2412_579"

><td id="579"><a href="#579">579</a></td></tr
><tr id="gr_svn2412_580"

><td id="580"><a href="#580">580</a></td></tr
><tr id="gr_svn2412_581"

><td id="581"><a href="#581">581</a></td></tr
><tr id="gr_svn2412_582"

><td id="582"><a href="#582">582</a></td></tr
><tr id="gr_svn2412_583"

><td id="583"><a href="#583">583</a></td></tr
><tr id="gr_svn2412_584"

><td id="584"><a href="#584">584</a></td></tr
><tr id="gr_svn2412_585"

><td id="585"><a href="#585">585</a></td></tr
><tr id="gr_svn2412_586"

><td id="586"><a href="#586">586</a></td></tr
><tr id="gr_svn2412_587"

><td id="587"><a href="#587">587</a></td></tr
><tr id="gr_svn2412_588"

><td id="588"><a href="#588">588</a></td></tr
><tr id="gr_svn2412_589"

><td id="589"><a href="#589">589</a></td></tr
><tr id="gr_svn2412_590"

><td id="590"><a href="#590">590</a></td></tr
><tr id="gr_svn2412_591"

><td id="591"><a href="#591">591</a></td></tr
><tr id="gr_svn2412_592"

><td id="592"><a href="#592">592</a></td></tr
><tr id="gr_svn2412_593"

><td id="593"><a href="#593">593</a></td></tr
><tr id="gr_svn2412_594"

><td id="594"><a href="#594">594</a></td></tr
><tr id="gr_svn2412_595"

><td id="595"><a href="#595">595</a></td></tr
><tr id="gr_svn2412_596"

><td id="596"><a href="#596">596</a></td></tr
><tr id="gr_svn2412_597"

><td id="597"><a href="#597">597</a></td></tr
><tr id="gr_svn2412_598"

><td id="598"><a href="#598">598</a></td></tr
><tr id="gr_svn2412_599"

><td id="599"><a href="#599">599</a></td></tr
><tr id="gr_svn2412_600"

><td id="600"><a href="#600">600</a></td></tr
><tr id="gr_svn2412_601"

><td id="601"><a href="#601">601</a></td></tr
><tr id="gr_svn2412_602"

><td id="602"><a href="#602">602</a></td></tr
><tr id="gr_svn2412_603"

><td id="603"><a href="#603">603</a></td></tr
><tr id="gr_svn2412_604"

><td id="604"><a href="#604">604</a></td></tr
><tr id="gr_svn2412_605"

><td id="605"><a href="#605">605</a></td></tr
><tr id="gr_svn2412_606"

><td id="606"><a href="#606">606</a></td></tr
><tr id="gr_svn2412_607"

><td id="607"><a href="#607">607</a></td></tr
><tr id="gr_svn2412_608"

><td id="608"><a href="#608">608</a></td></tr
><tr id="gr_svn2412_609"

><td id="609"><a href="#609">609</a></td></tr
><tr id="gr_svn2412_610"

><td id="610"><a href="#610">610</a></td></tr
><tr id="gr_svn2412_611"

><td id="611"><a href="#611">611</a></td></tr
><tr id="gr_svn2412_612"

><td id="612"><a href="#612">612</a></td></tr
><tr id="gr_svn2412_613"

><td id="613"><a href="#613">613</a></td></tr
><tr id="gr_svn2412_614"

><td id="614"><a href="#614">614</a></td></tr
><tr id="gr_svn2412_615"

><td id="615"><a href="#615">615</a></td></tr
><tr id="gr_svn2412_616"

><td id="616"><a href="#616">616</a></td></tr
><tr id="gr_svn2412_617"

><td id="617"><a href="#617">617</a></td></tr
><tr id="gr_svn2412_618"

><td id="618"><a href="#618">618</a></td></tr
><tr id="gr_svn2412_619"

><td id="619"><a href="#619">619</a></td></tr
><tr id="gr_svn2412_620"

><td id="620"><a href="#620">620</a></td></tr
><tr id="gr_svn2412_621"

><td id="621"><a href="#621">621</a></td></tr
><tr id="gr_svn2412_622"

><td id="622"><a href="#622">622</a></td></tr
><tr id="gr_svn2412_623"

><td id="623"><a href="#623">623</a></td></tr
><tr id="gr_svn2412_624"

><td id="624"><a href="#624">624</a></td></tr
><tr id="gr_svn2412_625"

><td id="625"><a href="#625">625</a></td></tr
><tr id="gr_svn2412_626"

><td id="626"><a href="#626">626</a></td></tr
><tr id="gr_svn2412_627"

><td id="627"><a href="#627">627</a></td></tr
><tr id="gr_svn2412_628"

><td id="628"><a href="#628">628</a></td></tr
><tr id="gr_svn2412_629"

><td id="629"><a href="#629">629</a></td></tr
><tr id="gr_svn2412_630"

><td id="630"><a href="#630">630</a></td></tr
><tr id="gr_svn2412_631"

><td id="631"><a href="#631">631</a></td></tr
><tr id="gr_svn2412_632"

><td id="632"><a href="#632">632</a></td></tr
><tr id="gr_svn2412_633"

><td id="633"><a href="#633">633</a></td></tr
><tr id="gr_svn2412_634"

><td id="634"><a href="#634">634</a></td></tr
><tr id="gr_svn2412_635"

><td id="635"><a href="#635">635</a></td></tr
><tr id="gr_svn2412_636"

><td id="636"><a href="#636">636</a></td></tr
><tr id="gr_svn2412_637"

><td id="637"><a href="#637">637</a></td></tr
><tr id="gr_svn2412_638"

><td id="638"><a href="#638">638</a></td></tr
><tr id="gr_svn2412_639"

><td id="639"><a href="#639">639</a></td></tr
><tr id="gr_svn2412_640"

><td id="640"><a href="#640">640</a></td></tr
><tr id="gr_svn2412_641"

><td id="641"><a href="#641">641</a></td></tr
><tr id="gr_svn2412_642"

><td id="642"><a href="#642">642</a></td></tr
><tr id="gr_svn2412_643"

><td id="643"><a href="#643">643</a></td></tr
><tr id="gr_svn2412_644"

><td id="644"><a href="#644">644</a></td></tr
><tr id="gr_svn2412_645"

><td id="645"><a href="#645">645</a></td></tr
><tr id="gr_svn2412_646"

><td id="646"><a href="#646">646</a></td></tr
><tr id="gr_svn2412_647"

><td id="647"><a href="#647">647</a></td></tr
><tr id="gr_svn2412_648"

><td id="648"><a href="#648">648</a></td></tr
><tr id="gr_svn2412_649"

><td id="649"><a href="#649">649</a></td></tr
><tr id="gr_svn2412_650"

><td id="650"><a href="#650">650</a></td></tr
><tr id="gr_svn2412_651"

><td id="651"><a href="#651">651</a></td></tr
><tr id="gr_svn2412_652"

><td id="652"><a href="#652">652</a></td></tr
><tr id="gr_svn2412_653"

><td id="653"><a href="#653">653</a></td></tr
><tr id="gr_svn2412_654"

><td id="654"><a href="#654">654</a></td></tr
></table></pre>
<pre><table width="100%"><tr class="nocursor"><td></td></tr></table></pre>
</td>
<td id="lines">
<pre><table width="100%"><tr class="cursor_stop cursor_hidden"><td></td></tr></table></pre>
<pre class="prettyprint lang-js"><table id="src_table_0"><tr
id=sl_svn2412_1

><td class="source">/*<br></td></tr
><tr
id=sl_svn2412_2

><td class="source"> * Copyright 2012 The Closure Compiler Authors.<br></td></tr
><tr
id=sl_svn2412_3

><td class="source"> *<br></td></tr
><tr
id=sl_svn2412_4

><td class="source"> * Licensed under the Apache License, Version 2.0 (the &quot;License&quot;);<br></td></tr
><tr
id=sl_svn2412_5

><td class="source"> * you may not use this file except in compliance with the License.<br></td></tr
><tr
id=sl_svn2412_6

><td class="source"> * You may obtain a copy of the License at<br></td></tr
><tr
id=sl_svn2412_7

><td class="source"> *<br></td></tr
><tr
id=sl_svn2412_8

><td class="source"> *     http://www.apache.org/licenses/LICENSE-2.0<br></td></tr
><tr
id=sl_svn2412_9

><td class="source"> *<br></td></tr
><tr
id=sl_svn2412_10

><td class="source"> * Unless required by applicable law or agreed to in writing, software<br></td></tr
><tr
id=sl_svn2412_11

><td class="source"> * distributed under the License is distributed on an &quot;AS IS&quot; BASIS,<br></td></tr
><tr
id=sl_svn2412_12

><td class="source"> * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.<br></td></tr
><tr
id=sl_svn2412_13

><td class="source"> * See the License for the specific language governing permissions and<br></td></tr
><tr
id=sl_svn2412_14

><td class="source"> * limitations under the License.<br></td></tr
><tr
id=sl_svn2412_15

><td class="source"> */<br></td></tr
><tr
id=sl_svn2412_16

><td class="source"><br></td></tr
><tr
id=sl_svn2412_17

><td class="source">/**<br></td></tr
><tr
id=sl_svn2412_18

><td class="source"> * @fileoverview Externs for Underscore 1.3.1<br></td></tr
><tr
id=sl_svn2412_19

><td class="source"> *<br></td></tr
><tr
id=sl_svn2412_20

><td class="source"> * TODO: Wrapper objects.<br></td></tr
><tr
id=sl_svn2412_21

><td class="source"> * TODO: _.bind - for some reason this plays up in practice.<br></td></tr
><tr
id=sl_svn2412_22

><td class="source"> *<br></td></tr
><tr
id=sl_svn2412_23

><td class="source"> * @see http://documentcloud.github.com/underscore/<br></td></tr
><tr
id=sl_svn2412_24

><td class="source"> * @externs<br></td></tr
><tr
id=sl_svn2412_25

><td class="source"> */<br></td></tr
><tr
id=sl_svn2412_26

><td class="source"><br></td></tr
><tr
id=sl_svn2412_27

><td class="source">/**<br></td></tr
><tr
id=sl_svn2412_28

><td class="source"> * @param {Object} obj<br></td></tr
><tr
id=sl_svn2412_29

><td class="source"> * @return {!_}<br></td></tr
><tr
id=sl_svn2412_30

><td class="source"> * @constructor<br></td></tr
><tr
id=sl_svn2412_31

><td class="source"> */<br></td></tr
><tr
id=sl_svn2412_32

><td class="source">function _(obj) {};<br></td></tr
><tr
id=sl_svn2412_33

><td class="source"><br></td></tr
><tr
id=sl_svn2412_34

><td class="source">// Collection functions<br></td></tr
><tr
id=sl_svn2412_35

><td class="source"><br></td></tr
><tr
id=sl_svn2412_36

><td class="source">/**<br></td></tr
><tr
id=sl_svn2412_37

><td class="source"> * @param {Object|Array} obj<br></td></tr
><tr
id=sl_svn2412_38

><td class="source"> * @param {Function} iterator<br></td></tr
><tr
id=sl_svn2412_39

><td class="source"> * @param {Object=} opt_context<br></td></tr
><tr
id=sl_svn2412_40

><td class="source"> */<br></td></tr
><tr
id=sl_svn2412_41

><td class="source">_.each = function(obj, iterator, opt_context) {};<br></td></tr
><tr
id=sl_svn2412_42

><td class="source"><br></td></tr
><tr
id=sl_svn2412_43

><td class="source">/**<br></td></tr
><tr
id=sl_svn2412_44

><td class="source"> * @param {Object|Array} obj<br></td></tr
><tr
id=sl_svn2412_45

><td class="source"> * @param {Function} iterator<br></td></tr
><tr
id=sl_svn2412_46

><td class="source"> * @param {Object=} opt_context<br></td></tr
><tr
id=sl_svn2412_47

><td class="source"> */<br></td></tr
><tr
id=sl_svn2412_48

><td class="source">_.forEach = function(obj, iterator, opt_context) {};<br></td></tr
><tr
id=sl_svn2412_49

><td class="source"><br></td></tr
><tr
id=sl_svn2412_50

><td class="source">/**<br></td></tr
><tr
id=sl_svn2412_51

><td class="source"> * @param {Object|Array} obj<br></td></tr
><tr
id=sl_svn2412_52

><td class="source"> * @param {Function} iterator<br></td></tr
><tr
id=sl_svn2412_53

><td class="source"> * @param {Object=} opt_context<br></td></tr
><tr
id=sl_svn2412_54

><td class="source"> * @return {!Array}<br></td></tr
><tr
id=sl_svn2412_55

><td class="source"> */<br></td></tr
><tr
id=sl_svn2412_56

><td class="source">_.map = function(obj, iterator, opt_context) {};<br></td></tr
><tr
id=sl_svn2412_57

><td class="source"><br></td></tr
><tr
id=sl_svn2412_58

><td class="source">/**<br></td></tr
><tr
id=sl_svn2412_59

><td class="source"> * @param {Object|Array} obj<br></td></tr
><tr
id=sl_svn2412_60

><td class="source"> * @param {Function} iterator<br></td></tr
><tr
id=sl_svn2412_61

><td class="source"> * @param {Object=} opt_context<br></td></tr
><tr
id=sl_svn2412_62

><td class="source"> * @return {!Array}<br></td></tr
><tr
id=sl_svn2412_63

><td class="source"> */<br></td></tr
><tr
id=sl_svn2412_64

><td class="source">_.collect = function(obj, iterator, opt_context) {};<br></td></tr
><tr
id=sl_svn2412_65

><td class="source"><br></td></tr
><tr
id=sl_svn2412_66

><td class="source">/**<br></td></tr
><tr
id=sl_svn2412_67

><td class="source"> * @param {Object|Array} obj<br></td></tr
><tr
id=sl_svn2412_68

><td class="source"> * @param {Function} iterator<br></td></tr
><tr
id=sl_svn2412_69

><td class="source"> * @param {*} memo<br></td></tr
><tr
id=sl_svn2412_70

><td class="source"> * @param {Object=} opt_context<br></td></tr
><tr
id=sl_svn2412_71

><td class="source"> * @return {!*}<br></td></tr
><tr
id=sl_svn2412_72

><td class="source"> */<br></td></tr
><tr
id=sl_svn2412_73

><td class="source">_.reduce = function(obj, iterator, memo, opt_context) {};<br></td></tr
><tr
id=sl_svn2412_74

><td class="source"><br></td></tr
><tr
id=sl_svn2412_75

><td class="source">/**<br></td></tr
><tr
id=sl_svn2412_76

><td class="source"> * @param {Object|Array} obj<br></td></tr
><tr
id=sl_svn2412_77

><td class="source"> * @param {Function} iterator<br></td></tr
><tr
id=sl_svn2412_78

><td class="source"> * @param {*} memo<br></td></tr
><tr
id=sl_svn2412_79

><td class="source"> * @param {Object=} opt_context<br></td></tr
><tr
id=sl_svn2412_80

><td class="source"> * @return {!*}<br></td></tr
><tr
id=sl_svn2412_81

><td class="source"> */<br></td></tr
><tr
id=sl_svn2412_82

><td class="source">_.inject = function(obj, iterator, memo, opt_context) {};<br></td></tr
><tr
id=sl_svn2412_83

><td class="source"><br></td></tr
><tr
id=sl_svn2412_84

><td class="source">/**<br></td></tr
><tr
id=sl_svn2412_85

><td class="source"> * @param {Object|Array} obj<br></td></tr
><tr
id=sl_svn2412_86

><td class="source"> * @param {Function} iterator<br></td></tr
><tr
id=sl_svn2412_87

><td class="source"> * @param {*} memo<br></td></tr
><tr
id=sl_svn2412_88

><td class="source"> * @param {Object=} opt_context<br></td></tr
><tr
id=sl_svn2412_89

><td class="source"> * @return {!*}<br></td></tr
><tr
id=sl_svn2412_90

><td class="source"> */<br></td></tr
><tr
id=sl_svn2412_91

><td class="source">_.foldl = function(obj, iterator, memo, opt_context) {};<br></td></tr
><tr
id=sl_svn2412_92

><td class="source"><br></td></tr
><tr
id=sl_svn2412_93

><td class="source">/**<br></td></tr
><tr
id=sl_svn2412_94

><td class="source"> * @param {Object|Array} obj<br></td></tr
><tr
id=sl_svn2412_95

><td class="source"> * @param {Function} iterator<br></td></tr
><tr
id=sl_svn2412_96

><td class="source"> * @param {*} memo<br></td></tr
><tr
id=sl_svn2412_97

><td class="source"> * @param {Object=} opt_context<br></td></tr
><tr
id=sl_svn2412_98

><td class="source"> * @return {!*}<br></td></tr
><tr
id=sl_svn2412_99

><td class="source"> */<br></td></tr
><tr
id=sl_svn2412_100

><td class="source">_.reduceRight = function(obj, iterator, memo, opt_context) {};<br></td></tr
><tr
id=sl_svn2412_101

><td class="source"><br></td></tr
><tr
id=sl_svn2412_102

><td class="source">/**<br></td></tr
><tr
id=sl_svn2412_103

><td class="source"> * @param {Object|Array} obj<br></td></tr
><tr
id=sl_svn2412_104

><td class="source"> * @param {Function} iterator<br></td></tr
><tr
id=sl_svn2412_105

><td class="source"> * @param {*} memo<br></td></tr
><tr
id=sl_svn2412_106

><td class="source"> * @param {Object=} opt_context<br></td></tr
><tr
id=sl_svn2412_107

><td class="source"> * @return {!*}<br></td></tr
><tr
id=sl_svn2412_108

><td class="source"> */<br></td></tr
><tr
id=sl_svn2412_109

><td class="source">_.foldr = function(obj, iterator, memo, opt_context) {};<br></td></tr
><tr
id=sl_svn2412_110

><td class="source"><br></td></tr
><tr
id=sl_svn2412_111

><td class="source">/**<br></td></tr
><tr
id=sl_svn2412_112

><td class="source"> * @param {Object|Array} obj<br></td></tr
><tr
id=sl_svn2412_113

><td class="source"> * @param {Function} iterator<br></td></tr
><tr
id=sl_svn2412_114

><td class="source"> * @param {Object=} opt_context<br></td></tr
><tr
id=sl_svn2412_115

><td class="source"> * @return {!*}<br></td></tr
><tr
id=sl_svn2412_116

><td class="source"> */<br></td></tr
><tr
id=sl_svn2412_117

><td class="source">_.find = function(obj, iterator, opt_context) {};<br></td></tr
><tr
id=sl_svn2412_118

><td class="source"><br></td></tr
><tr
id=sl_svn2412_119

><td class="source">/**<br></td></tr
><tr
id=sl_svn2412_120

><td class="source"> * @param {Object|Array} obj<br></td></tr
><tr
id=sl_svn2412_121

><td class="source"> * @param {Function} iterator<br></td></tr
><tr
id=sl_svn2412_122

><td class="source"> * @param {Object=} opt_context<br></td></tr
><tr
id=sl_svn2412_123

><td class="source"> * @return {!*}<br></td></tr
><tr
id=sl_svn2412_124

><td class="source"> */<br></td></tr
><tr
id=sl_svn2412_125

><td class="source">_.detect = function(obj, iterator, opt_context) {};<br></td></tr
><tr
id=sl_svn2412_126

><td class="source"><br></td></tr
><tr
id=sl_svn2412_127

><td class="source">/**<br></td></tr
><tr
id=sl_svn2412_128

><td class="source"> * @param {Object|Array} obj<br></td></tr
><tr
id=sl_svn2412_129

><td class="source"> * @param {Function} iterator<br></td></tr
><tr
id=sl_svn2412_130

><td class="source"> * @param {Object=} opt_context<br></td></tr
><tr
id=sl_svn2412_131

><td class="source"> * @return {!Array}<br></td></tr
><tr
id=sl_svn2412_132

><td class="source"> */<br></td></tr
><tr
id=sl_svn2412_133

><td class="source">_.filter = function(obj, iterator, opt_context) {};<br></td></tr
><tr
id=sl_svn2412_134

><td class="source"><br></td></tr
><tr
id=sl_svn2412_135

><td class="source">/**<br></td></tr
><tr
id=sl_svn2412_136

><td class="source"> * @param {Object|Array} obj<br></td></tr
><tr
id=sl_svn2412_137

><td class="source"> * @param {Function} iterator<br></td></tr
><tr
id=sl_svn2412_138

><td class="source"> * @param {Object=} opt_context<br></td></tr
><tr
id=sl_svn2412_139

><td class="source"> * @return {!Array}<br></td></tr
><tr
id=sl_svn2412_140

><td class="source"> */<br></td></tr
><tr
id=sl_svn2412_141

><td class="source">_.select = function(obj, iterator, opt_context) {};<br></td></tr
><tr
id=sl_svn2412_142

><td class="source"><br></td></tr
><tr
id=sl_svn2412_143

><td class="source">/**<br></td></tr
><tr
id=sl_svn2412_144

><td class="source"> * @param {Object|Array} obj<br></td></tr
><tr
id=sl_svn2412_145

><td class="source"> * @param {Function} iterator<br></td></tr
><tr
id=sl_svn2412_146

><td class="source"> * @param {Object=} opt_context<br></td></tr
><tr
id=sl_svn2412_147

><td class="source"> * @return {!Array}<br></td></tr
><tr
id=sl_svn2412_148

><td class="source"> */<br></td></tr
><tr
id=sl_svn2412_149

><td class="source">_.reject = function(obj, iterator, opt_context) {};<br></td></tr
><tr
id=sl_svn2412_150

><td class="source"><br></td></tr
><tr
id=sl_svn2412_151

><td class="source">/**<br></td></tr
><tr
id=sl_svn2412_152

><td class="source"> * @param {Object|Array} obj<br></td></tr
><tr
id=sl_svn2412_153

><td class="source"> * @param {Function} iterator<br></td></tr
><tr
id=sl_svn2412_154

><td class="source"> * @param {Object=} opt_context<br></td></tr
><tr
id=sl_svn2412_155

><td class="source"> * @return {boolean}<br></td></tr
><tr
id=sl_svn2412_156

><td class="source"> */<br></td></tr
><tr
id=sl_svn2412_157

><td class="source">_.every = function(obj, iterator, opt_context) {};<br></td></tr
><tr
id=sl_svn2412_158

><td class="source"><br></td></tr
><tr
id=sl_svn2412_159

><td class="source">/**<br></td></tr
><tr
id=sl_svn2412_160

><td class="source"> * @param {Object|Array} obj<br></td></tr
><tr
id=sl_svn2412_161

><td class="source"> * @param {Function} iterator<br></td></tr
><tr
id=sl_svn2412_162

><td class="source"> * @param {Object=} opt_context<br></td></tr
><tr
id=sl_svn2412_163

><td class="source"> * @return {boolean}<br></td></tr
><tr
id=sl_svn2412_164

><td class="source"> */<br></td></tr
><tr
id=sl_svn2412_165

><td class="source">_.all = function(obj, iterator, opt_context) {};<br></td></tr
><tr
id=sl_svn2412_166

><td class="source"><br></td></tr
><tr
id=sl_svn2412_167

><td class="source">/**<br></td></tr
><tr
id=sl_svn2412_168

><td class="source"> * @param {Object|Array} obj<br></td></tr
><tr
id=sl_svn2412_169

><td class="source"> * @param {Function} iterator<br></td></tr
><tr
id=sl_svn2412_170

><td class="source"> * @param {Object=} opt_context<br></td></tr
><tr
id=sl_svn2412_171

><td class="source"> * @return {boolean}<br></td></tr
><tr
id=sl_svn2412_172

><td class="source"> */<br></td></tr
><tr
id=sl_svn2412_173

><td class="source">_.some = function(obj, iterator, opt_context) {};<br></td></tr
><tr
id=sl_svn2412_174

><td class="source"><br></td></tr
><tr
id=sl_svn2412_175

><td class="source">/**<br></td></tr
><tr
id=sl_svn2412_176

><td class="source"> * @param {Object|Array} obj<br></td></tr
><tr
id=sl_svn2412_177

><td class="source"> * @param {Function} iterator<br></td></tr
><tr
id=sl_svn2412_178

><td class="source"> * @param {Object=} opt_context<br></td></tr
><tr
id=sl_svn2412_179

><td class="source"> * @return {boolean}<br></td></tr
><tr
id=sl_svn2412_180

><td class="source"> */<br></td></tr
><tr
id=sl_svn2412_181

><td class="source">_.any = function(obj, iterator, opt_context) {};<br></td></tr
><tr
id=sl_svn2412_182

><td class="source"><br></td></tr
><tr
id=sl_svn2412_183

><td class="source">/**<br></td></tr
><tr
id=sl_svn2412_184

><td class="source"> * @param {Object|Array} obj<br></td></tr
><tr
id=sl_svn2412_185

><td class="source"> * @param {*} target<br></td></tr
><tr
id=sl_svn2412_186

><td class="source"> * @return {boolean}<br></td></tr
><tr
id=sl_svn2412_187

><td class="source"> */<br></td></tr
><tr
id=sl_svn2412_188

><td class="source">_.include = function(obj, target) {};<br></td></tr
><tr
id=sl_svn2412_189

><td class="source"><br></td></tr
><tr
id=sl_svn2412_190

><td class="source">/**<br></td></tr
><tr
id=sl_svn2412_191

><td class="source"> * @param {Object|Array} obj<br></td></tr
><tr
id=sl_svn2412_192

><td class="source"> * @param {*} target<br></td></tr
><tr
id=sl_svn2412_193

><td class="source"> * @return {boolean}<br></td></tr
><tr
id=sl_svn2412_194

><td class="source"> */<br></td></tr
><tr
id=sl_svn2412_195

><td class="source">_.contains = function(obj, target) {};<br></td></tr
><tr
id=sl_svn2412_196

><td class="source"><br></td></tr
><tr
id=sl_svn2412_197

><td class="source">/**<br></td></tr
><tr
id=sl_svn2412_198

><td class="source"> * @param {Object|Array} obj<br></td></tr
><tr
id=sl_svn2412_199

><td class="source"> * @param {Function} method<br></td></tr
><tr
id=sl_svn2412_200

><td class="source"> * @param {...*} var_args<br></td></tr
><tr
id=sl_svn2412_201

><td class="source"> */<br></td></tr
><tr
id=sl_svn2412_202

><td class="source">_.invoke = function(obj, method, var_args) {};<br></td></tr
><tr
id=sl_svn2412_203

><td class="source"><br></td></tr
><tr
id=sl_svn2412_204

><td class="source">/**<br></td></tr
><tr
id=sl_svn2412_205

><td class="source"> * @param {Array.&lt;Object&gt;} obj<br></td></tr
><tr
id=sl_svn2412_206

><td class="source"> * @param {string} key<br></td></tr
><tr
id=sl_svn2412_207

><td class="source"> * @return {!Array}<br></td></tr
><tr
id=sl_svn2412_208

><td class="source"> */<br></td></tr
><tr
id=sl_svn2412_209

><td class="source">_.pluck = function(obj, key) {};<br></td></tr
><tr
id=sl_svn2412_210

><td class="source"><br></td></tr
><tr
id=sl_svn2412_211

><td class="source">/**<br></td></tr
><tr
id=sl_svn2412_212

><td class="source"> * @param {Object|Array} obj<br></td></tr
><tr
id=sl_svn2412_213

><td class="source"> * @param {Function} opt_iterator<br></td></tr
><tr
id=sl_svn2412_214

><td class="source"> * @param {Object=} opt_context<br></td></tr
><tr
id=sl_svn2412_215

><td class="source"> * @return {!*}<br></td></tr
><tr
id=sl_svn2412_216

><td class="source"> */<br></td></tr
><tr
id=sl_svn2412_217

><td class="source">_.max = function(obj, opt_iterator, opt_context) {};<br></td></tr
><tr
id=sl_svn2412_218

><td class="source"><br></td></tr
><tr
id=sl_svn2412_219

><td class="source">/**<br></td></tr
><tr
id=sl_svn2412_220

><td class="source"> * @param {Object|Array} obj<br></td></tr
><tr
id=sl_svn2412_221

><td class="source"> * @param {Function} opt_iterator<br></td></tr
><tr
id=sl_svn2412_222

><td class="source"> * @param {Object=} opt_context<br></td></tr
><tr
id=sl_svn2412_223

><td class="source"> * @return {!*}<br></td></tr
><tr
id=sl_svn2412_224

><td class="source"> */<br></td></tr
><tr
id=sl_svn2412_225

><td class="source">_.min = function(obj, opt_iterator, opt_context) {};<br></td></tr
><tr
id=sl_svn2412_226

><td class="source"><br></td></tr
><tr
id=sl_svn2412_227

><td class="source">/**<br></td></tr
><tr
id=sl_svn2412_228

><td class="source"> * @param {Object|Array} obj<br></td></tr
><tr
id=sl_svn2412_229

><td class="source"> * @return {!Array}<br></td></tr
><tr
id=sl_svn2412_230

><td class="source"> */<br></td></tr
><tr
id=sl_svn2412_231

><td class="source">_.shuffle = function(obj) {};<br></td></tr
><tr
id=sl_svn2412_232

><td class="source"><br></td></tr
><tr
id=sl_svn2412_233

><td class="source">/**<br></td></tr
><tr
id=sl_svn2412_234

><td class="source"> * @param {Object|Array} obj<br></td></tr
><tr
id=sl_svn2412_235

><td class="source"> * @param {Function} iterator<br></td></tr
><tr
id=sl_svn2412_236

><td class="source"> * @param {Object=} opt_context<br></td></tr
><tr
id=sl_svn2412_237

><td class="source"> * @return {!Array}<br></td></tr
><tr
id=sl_svn2412_238

><td class="source"> */<br></td></tr
><tr
id=sl_svn2412_239

><td class="source">_.sortBy = function(obj, iterator, opt_context) {};<br></td></tr
><tr
id=sl_svn2412_240

><td class="source"><br></td></tr
><tr
id=sl_svn2412_241

><td class="source">/**<br></td></tr
><tr
id=sl_svn2412_242

><td class="source"> * @param {Object|Array} obj<br></td></tr
><tr
id=sl_svn2412_243

><td class="source"> * @param {string|Function} iterator<br></td></tr
><tr
id=sl_svn2412_244

><td class="source"> * @return {!Array.&lt;!Array&gt;}<br></td></tr
><tr
id=sl_svn2412_245

><td class="source"> */<br></td></tr
><tr
id=sl_svn2412_246

><td class="source">_.groupBy = function(obj, iterator) {};<br></td></tr
><tr
id=sl_svn2412_247

><td class="source"><br></td></tr
><tr
id=sl_svn2412_248

><td class="source">/**<br></td></tr
><tr
id=sl_svn2412_249

><td class="source"> * @param {Array} list<br></td></tr
><tr
id=sl_svn2412_250

><td class="source"> * @param {*} obj<br></td></tr
><tr
id=sl_svn2412_251

><td class="source"> * @param {Function} opt_iterator<br></td></tr
><tr
id=sl_svn2412_252

><td class="source"> * @return {!number}<br></td></tr
><tr
id=sl_svn2412_253

><td class="source"> */<br></td></tr
><tr
id=sl_svn2412_254

><td class="source">_.sortedIndex = function(list, obj, opt_iterator) {};<br></td></tr
><tr
id=sl_svn2412_255

><td class="source"><br></td></tr
><tr
id=sl_svn2412_256

><td class="source">/**<br></td></tr
><tr
id=sl_svn2412_257

><td class="source"> * @param {*} iterable<br></td></tr
><tr
id=sl_svn2412_258

><td class="source"> * @return {!Array}<br></td></tr
><tr
id=sl_svn2412_259

><td class="source"> */<br></td></tr
><tr
id=sl_svn2412_260

><td class="source">_.toArray = function(iterable) {};<br></td></tr
><tr
id=sl_svn2412_261

><td class="source"><br></td></tr
><tr
id=sl_svn2412_262

><td class="source">/**<br></td></tr
><tr
id=sl_svn2412_263

><td class="source"> * @param {Object|Array} obj<br></td></tr
><tr
id=sl_svn2412_264

><td class="source"> * @return {!Array}<br></td></tr
><tr
id=sl_svn2412_265

><td class="source"> */<br></td></tr
><tr
id=sl_svn2412_266

><td class="source">_.size = function(obj) {};<br></td></tr
><tr
id=sl_svn2412_267

><td class="source"><br></td></tr
><tr
id=sl_svn2412_268

><td class="source">// Array functions<br></td></tr
><tr
id=sl_svn2412_269

><td class="source"><br></td></tr
><tr
id=sl_svn2412_270

><td class="source">/**<br></td></tr
><tr
id=sl_svn2412_271

><td class="source"> * @param {Array} array<br></td></tr
><tr
id=sl_svn2412_272

><td class="source"> * @param {number=} opt_n<br></td></tr
><tr
id=sl_svn2412_273

><td class="source"> * @return {!*}<br></td></tr
><tr
id=sl_svn2412_274

><td class="source"> */<br></td></tr
><tr
id=sl_svn2412_275

><td class="source">_.first = function(array, opt_n) {};<br></td></tr
><tr
id=sl_svn2412_276

><td class="source"><br></td></tr
><tr
id=sl_svn2412_277

><td class="source">/**<br></td></tr
><tr
id=sl_svn2412_278

><td class="source"> * @param {Array} array<br></td></tr
><tr
id=sl_svn2412_279

><td class="source"> * @param {number=} opt_n<br></td></tr
><tr
id=sl_svn2412_280

><td class="source"> * @return {!*}<br></td></tr
><tr
id=sl_svn2412_281

><td class="source"> */<br></td></tr
><tr
id=sl_svn2412_282

><td class="source">_.head = function(array, opt_n) {};<br></td></tr
><tr
id=sl_svn2412_283

><td class="source"><br></td></tr
><tr
id=sl_svn2412_284

><td class="source">/**<br></td></tr
><tr
id=sl_svn2412_285

><td class="source"> * @param {Array} array<br></td></tr
><tr
id=sl_svn2412_286

><td class="source"> * @param {number=} opt_n<br></td></tr
><tr
id=sl_svn2412_287

><td class="source"> * @return {!Array}<br></td></tr
><tr
id=sl_svn2412_288

><td class="source"> */<br></td></tr
><tr
id=sl_svn2412_289

><td class="source">_.initial = function(array, opt_n) {};<br></td></tr
><tr
id=sl_svn2412_290

><td class="source"><br></td></tr
><tr
id=sl_svn2412_291

><td class="source">/**<br></td></tr
><tr
id=sl_svn2412_292

><td class="source"> * @param {Array} array<br></td></tr
><tr
id=sl_svn2412_293

><td class="source"> * @param {number=} opt_n<br></td></tr
><tr
id=sl_svn2412_294

><td class="source"> * @return {!Array}<br></td></tr
><tr
id=sl_svn2412_295

><td class="source"> */<br></td></tr
><tr
id=sl_svn2412_296

><td class="source">_.last = function(array, opt_n) {};<br></td></tr
><tr
id=sl_svn2412_297

><td class="source"><br></td></tr
><tr
id=sl_svn2412_298

><td class="source">/**<br></td></tr
><tr
id=sl_svn2412_299

><td class="source"> * @param {Array} array<br></td></tr
><tr
id=sl_svn2412_300

><td class="source"> * @param {number=} opt_n<br></td></tr
><tr
id=sl_svn2412_301

><td class="source"> * @return {!*}<br></td></tr
><tr
id=sl_svn2412_302

><td class="source"> */<br></td></tr
><tr
id=sl_svn2412_303

><td class="source">_.rest = function(array, opt_n) {};<br></td></tr
><tr
id=sl_svn2412_304

><td class="source"><br></td></tr
><tr
id=sl_svn2412_305

><td class="source">/**<br></td></tr
><tr
id=sl_svn2412_306

><td class="source"> * @param {Array} array<br></td></tr
><tr
id=sl_svn2412_307

><td class="source"> * @param {number=} opt_n<br></td></tr
><tr
id=sl_svn2412_308

><td class="source"> * @return {!*}<br></td></tr
><tr
id=sl_svn2412_309

><td class="source"> */<br></td></tr
><tr
id=sl_svn2412_310

><td class="source">_.tail = function(array, opt_n) {};<br></td></tr
><tr
id=sl_svn2412_311

><td class="source"><br></td></tr
><tr
id=sl_svn2412_312

><td class="source">/**<br></td></tr
><tr
id=sl_svn2412_313

><td class="source"> * @param {Array} array<br></td></tr
><tr
id=sl_svn2412_314

><td class="source"> * @return {!Array}<br></td></tr
><tr
id=sl_svn2412_315

><td class="source"> */<br></td></tr
><tr
id=sl_svn2412_316

><td class="source">_.compact = function(array) {};<br></td></tr
><tr
id=sl_svn2412_317

><td class="source"><br></td></tr
><tr
id=sl_svn2412_318

><td class="source">/**<br></td></tr
><tr
id=sl_svn2412_319

><td class="source"> * @param {Array} array<br></td></tr
><tr
id=sl_svn2412_320

><td class="source"> * @param {boolean=} opt_shallow<br></td></tr
><tr
id=sl_svn2412_321

><td class="source"> * @return {!Array}<br></td></tr
><tr
id=sl_svn2412_322

><td class="source"> */<br></td></tr
><tr
id=sl_svn2412_323

><td class="source">_.flatten = function(array, opt_shallow) {};<br></td></tr
><tr
id=sl_svn2412_324

><td class="source"><br></td></tr
><tr
id=sl_svn2412_325

><td class="source">/**<br></td></tr
><tr
id=sl_svn2412_326

><td class="source"> * @param {Array} array<br></td></tr
><tr
id=sl_svn2412_327

><td class="source"> * @param {...*} var_args<br></td></tr
><tr
id=sl_svn2412_328

><td class="source"> * @return {!Array}<br></td></tr
><tr
id=sl_svn2412_329

><td class="source"> */<br></td></tr
><tr
id=sl_svn2412_330

><td class="source">_.without = function(array, var_args) {};<br></td></tr
><tr
id=sl_svn2412_331

><td class="source"><br></td></tr
><tr
id=sl_svn2412_332

><td class="source">/**<br></td></tr
><tr
id=sl_svn2412_333

><td class="source"> * @param {Array} array<br></td></tr
><tr
id=sl_svn2412_334

><td class="source"> * @param {boolean=} opt_isSorted<br></td></tr
><tr
id=sl_svn2412_335

><td class="source"> * @param {Function} opt_iterator<br></td></tr
><tr
id=sl_svn2412_336

><td class="source"> * @return {!Array}<br></td></tr
><tr
id=sl_svn2412_337

><td class="source"> */<br></td></tr
><tr
id=sl_svn2412_338

><td class="source">_.uniq = function(array, opt_isSorted, opt_iterator) {};<br></td></tr
><tr
id=sl_svn2412_339

><td class="source"><br></td></tr
><tr
id=sl_svn2412_340

><td class="source">/**<br></td></tr
><tr
id=sl_svn2412_341

><td class="source"> * @param {Array} array<br></td></tr
><tr
id=sl_svn2412_342

><td class="source"> * @param {boolean=} opt_isSorted<br></td></tr
><tr
id=sl_svn2412_343

><td class="source"> * @param {Function} opt_iterator<br></td></tr
><tr
id=sl_svn2412_344

><td class="source"> * @return {!Array}<br></td></tr
><tr
id=sl_svn2412_345

><td class="source"> */<br></td></tr
><tr
id=sl_svn2412_346

><td class="source">_.unique = function(array, opt_isSorted, opt_iterator) {};<br></td></tr
><tr
id=sl_svn2412_347

><td class="source"><br></td></tr
><tr
id=sl_svn2412_348

><td class="source">/**<br></td></tr
><tr
id=sl_svn2412_349

><td class="source"> * @param {...Array} arrays<br></td></tr
><tr
id=sl_svn2412_350

><td class="source"> * @return {!Array}<br></td></tr
><tr
id=sl_svn2412_351

><td class="source"> */<br></td></tr
><tr
id=sl_svn2412_352

><td class="source">_.union = function(arrays) {};<br></td></tr
><tr
id=sl_svn2412_353

><td class="source"><br></td></tr
><tr
id=sl_svn2412_354

><td class="source">/**<br></td></tr
><tr
id=sl_svn2412_355

><td class="source"> * @param {...Array} arrays<br></td></tr
><tr
id=sl_svn2412_356

><td class="source"> * @return {!Array}<br></td></tr
><tr
id=sl_svn2412_357

><td class="source"> */<br></td></tr
><tr
id=sl_svn2412_358

><td class="source">_.intersection = function(arrays) {};<br></td></tr
><tr
id=sl_svn2412_359

><td class="source"><br></td></tr
><tr
id=sl_svn2412_360

><td class="source">/**<br></td></tr
><tr
id=sl_svn2412_361

><td class="source"> * @param {...Array} arrays<br></td></tr
><tr
id=sl_svn2412_362

><td class="source"> * @return {!Array}<br></td></tr
><tr
id=sl_svn2412_363

><td class="source"> */<br></td></tr
><tr
id=sl_svn2412_364

><td class="source">_.intersect = function(arrays) {};<br></td></tr
><tr
id=sl_svn2412_365

><td class="source"><br></td></tr
><tr
id=sl_svn2412_366

><td class="source">/**<br></td></tr
><tr
id=sl_svn2412_367

><td class="source"> * @param {Array} array<br></td></tr
><tr
id=sl_svn2412_368

><td class="source"> * @param {...Array} arrays<br></td></tr
><tr
id=sl_svn2412_369

><td class="source"> * @return {!Array}<br></td></tr
><tr
id=sl_svn2412_370

><td class="source"> */<br></td></tr
><tr
id=sl_svn2412_371

><td class="source">_.difference = function(array, arrays) {};<br></td></tr
><tr
id=sl_svn2412_372

><td class="source"><br></td></tr
><tr
id=sl_svn2412_373

><td class="source">/**<br></td></tr
><tr
id=sl_svn2412_374

><td class="source"> * @param {...Array} arrays<br></td></tr
><tr
id=sl_svn2412_375

><td class="source"> * @return {!Array}<br></td></tr
><tr
id=sl_svn2412_376

><td class="source"> */<br></td></tr
><tr
id=sl_svn2412_377

><td class="source">_.zip = function(arrays) {};<br></td></tr
><tr
id=sl_svn2412_378

><td class="source"><br></td></tr
><tr
id=sl_svn2412_379

><td class="source">/**<br></td></tr
><tr
id=sl_svn2412_380

><td class="source"> * @param {Array} array<br></td></tr
><tr
id=sl_svn2412_381

><td class="source"> * @param {*} item<br></td></tr
><tr
id=sl_svn2412_382

><td class="source"> * @param {boolean=} opt_isSorted<br></td></tr
><tr
id=sl_svn2412_383

><td class="source"> * @return {!number}<br></td></tr
><tr
id=sl_svn2412_384

><td class="source"> */<br></td></tr
><tr
id=sl_svn2412_385

><td class="source">_.indexOf = function(array, item, opt_isSorted) {};<br></td></tr
><tr
id=sl_svn2412_386

><td class="source"><br></td></tr
><tr
id=sl_svn2412_387

><td class="source">/**<br></td></tr
><tr
id=sl_svn2412_388

><td class="source"> * @param {Array} array<br></td></tr
><tr
id=sl_svn2412_389

><td class="source"> * @param {*} item<br></td></tr
><tr
id=sl_svn2412_390

><td class="source"> * @return {!number}<br></td></tr
><tr
id=sl_svn2412_391

><td class="source"> */<br></td></tr
><tr
id=sl_svn2412_392

><td class="source">_.lastIndexOf = function(array, item) {};<br></td></tr
><tr
id=sl_svn2412_393

><td class="source"><br></td></tr
><tr
id=sl_svn2412_394

><td class="source">/**<br></td></tr
><tr
id=sl_svn2412_395

><td class="source"> * @param {number} start<br></td></tr
><tr
id=sl_svn2412_396

><td class="source"> * @param {number=} opt_stop<br></td></tr
><tr
id=sl_svn2412_397

><td class="source"> * @param {number=} opt_step<br></td></tr
><tr
id=sl_svn2412_398

><td class="source"> * @return {!Array.&lt;number&gt;}<br></td></tr
><tr
id=sl_svn2412_399

><td class="source"> */<br></td></tr
><tr
id=sl_svn2412_400

><td class="source">_.range = function(start, opt_stop, opt_step) {};<br></td></tr
><tr
id=sl_svn2412_401

><td class="source"><br></td></tr
><tr
id=sl_svn2412_402

><td class="source">// Function (ahem) functions<br></td></tr
><tr
id=sl_svn2412_403

><td class="source"><br></td></tr
><tr
id=sl_svn2412_404

><td class="source">/**<br></td></tr
><tr
id=sl_svn2412_405

><td class="source"> * @param {Object} obj<br></td></tr
><tr
id=sl_svn2412_406

><td class="source"> * @param {...string} methodNames<br></td></tr
><tr
id=sl_svn2412_407

><td class="source"> */<br></td></tr
><tr
id=sl_svn2412_408

><td class="source">_.bindAll = function(obj, methodNames) {};<br></td></tr
><tr
id=sl_svn2412_409

><td class="source"><br></td></tr
><tr
id=sl_svn2412_410

><td class="source">/**<br></td></tr
><tr
id=sl_svn2412_411

><td class="source"> * @param {Function} func<br></td></tr
><tr
id=sl_svn2412_412

><td class="source"> * @param {Function=} opt_hasher<br></td></tr
><tr
id=sl_svn2412_413

><td class="source"> */<br></td></tr
><tr
id=sl_svn2412_414

><td class="source">_.memoize = function(func, opt_hasher) {};<br></td></tr
><tr
id=sl_svn2412_415

><td class="source"><br></td></tr
><tr
id=sl_svn2412_416

><td class="source">/**<br></td></tr
><tr
id=sl_svn2412_417

><td class="source"> * @param {Function} func<br></td></tr
><tr
id=sl_svn2412_418

><td class="source"> * @param {number} wait<br></td></tr
><tr
id=sl_svn2412_419

><td class="source"> * @param {...*} var_args<br></td></tr
><tr
id=sl_svn2412_420

><td class="source"> */<br></td></tr
><tr
id=sl_svn2412_421

><td class="source">_.delay = function(func, wait, var_args) {};<br></td></tr
><tr
id=sl_svn2412_422

><td class="source"><br></td></tr
><tr
id=sl_svn2412_423

><td class="source">/**<br></td></tr
><tr
id=sl_svn2412_424

><td class="source"> * @param {Function} func<br></td></tr
><tr
id=sl_svn2412_425

><td class="source"> */<br></td></tr
><tr
id=sl_svn2412_426

><td class="source">_.defer = function(func) {};<br></td></tr
><tr
id=sl_svn2412_427

><td class="source"><br></td></tr
><tr
id=sl_svn2412_428

><td class="source">/**<br></td></tr
><tr
id=sl_svn2412_429

><td class="source"> * @param {Function} func<br></td></tr
><tr
id=sl_svn2412_430

><td class="source"> * @param {number} wait<br></td></tr
><tr
id=sl_svn2412_431

><td class="source"> */<br></td></tr
><tr
id=sl_svn2412_432

><td class="source">_.throttle = function(func, wait) {};<br></td></tr
><tr
id=sl_svn2412_433

><td class="source"><br></td></tr
><tr
id=sl_svn2412_434

><td class="source">/**<br></td></tr
><tr
id=sl_svn2412_435

><td class="source"> * @param {Function} func<br></td></tr
><tr
id=sl_svn2412_436

><td class="source"> * @param {number} wait<br></td></tr
><tr
id=sl_svn2412_437

><td class="source"> */<br></td></tr
><tr
id=sl_svn2412_438

><td class="source">_.debounce = function(func, wait) {};<br></td></tr
><tr
id=sl_svn2412_439

><td class="source"><br></td></tr
><tr
id=sl_svn2412_440

><td class="source">/**<br></td></tr
><tr
id=sl_svn2412_441

><td class="source"> * @param {Function} func<br></td></tr
><tr
id=sl_svn2412_442

><td class="source"> */<br></td></tr
><tr
id=sl_svn2412_443

><td class="source">_.once = function(func) {};<br></td></tr
><tr
id=sl_svn2412_444

><td class="source"><br></td></tr
><tr
id=sl_svn2412_445

><td class="source">/**<br></td></tr
><tr
id=sl_svn2412_446

><td class="source"> * @param {Function} func<br></td></tr
><tr
id=sl_svn2412_447

><td class="source"> * @param {Function} wrapper<br></td></tr
><tr
id=sl_svn2412_448

><td class="source"> * @return {!Function}<br></td></tr
><tr
id=sl_svn2412_449

><td class="source"> */<br></td></tr
><tr
id=sl_svn2412_450

><td class="source">_.wrap = function(func, wrapper) {};<br></td></tr
><tr
id=sl_svn2412_451

><td class="source"><br></td></tr
><tr
id=sl_svn2412_452

><td class="source">/**<br></td></tr
><tr
id=sl_svn2412_453

><td class="source"> * @param {...Function} funcs<br></td></tr
><tr
id=sl_svn2412_454

><td class="source"> * @return {!Function}<br></td></tr
><tr
id=sl_svn2412_455

><td class="source"> */<br></td></tr
><tr
id=sl_svn2412_456

><td class="source">_.compose = function(funcs) {};<br></td></tr
><tr
id=sl_svn2412_457

><td class="source"><br></td></tr
><tr
id=sl_svn2412_458

><td class="source">/**<br></td></tr
><tr
id=sl_svn2412_459

><td class="source"> * @param {number} times<br></td></tr
><tr
id=sl_svn2412_460

><td class="source"> * @param {Function} func<br></td></tr
><tr
id=sl_svn2412_461

><td class="source"> */<br></td></tr
><tr
id=sl_svn2412_462

><td class="source">_.after = function(times, func) {};<br></td></tr
><tr
id=sl_svn2412_463

><td class="source"><br></td></tr
><tr
id=sl_svn2412_464

><td class="source">// Object functions<br></td></tr
><tr
id=sl_svn2412_465

><td class="source"><br></td></tr
><tr
id=sl_svn2412_466

><td class="source">/**<br></td></tr
><tr
id=sl_svn2412_467

><td class="source"> * @param {Object} obj<br></td></tr
><tr
id=sl_svn2412_468

><td class="source"> * @return {!Array.&lt;string&gt;}<br></td></tr
><tr
id=sl_svn2412_469

><td class="source"> */<br></td></tr
><tr
id=sl_svn2412_470

><td class="source">_.keys = function(obj) {};<br></td></tr
><tr
id=sl_svn2412_471

><td class="source"><br></td></tr
><tr
id=sl_svn2412_472

><td class="source">/**<br></td></tr
><tr
id=sl_svn2412_473

><td class="source"> * @param {Object} obj<br></td></tr
><tr
id=sl_svn2412_474

><td class="source"> * @return {!Array}<br></td></tr
><tr
id=sl_svn2412_475

><td class="source"> */<br></td></tr
><tr
id=sl_svn2412_476

><td class="source">_.values = function(obj) {};<br></td></tr
><tr
id=sl_svn2412_477

><td class="source"><br></td></tr
><tr
id=sl_svn2412_478

><td class="source">/**<br></td></tr
><tr
id=sl_svn2412_479

><td class="source"> * @param {Object} obj<br></td></tr
><tr
id=sl_svn2412_480

><td class="source"> * @return {!Array.&lt;string&gt;}<br></td></tr
><tr
id=sl_svn2412_481

><td class="source"> */<br></td></tr
><tr
id=sl_svn2412_482

><td class="source">_.functions = function(obj) {};<br></td></tr
><tr
id=sl_svn2412_483

><td class="source"><br></td></tr
><tr
id=sl_svn2412_484

><td class="source">/**<br></td></tr
><tr
id=sl_svn2412_485

><td class="source"> * @param {Object} obj<br></td></tr
><tr
id=sl_svn2412_486

><td class="source"> * @return {!Array.&lt;string&gt;}<br></td></tr
><tr
id=sl_svn2412_487

><td class="source"> */<br></td></tr
><tr
id=sl_svn2412_488

><td class="source">_.methods = function(obj) {};<br></td></tr
><tr
id=sl_svn2412_489

><td class="source"><br></td></tr
><tr
id=sl_svn2412_490

><td class="source">/**<br></td></tr
><tr
id=sl_svn2412_491

><td class="source"> * @param {Object} obj<br></td></tr
><tr
id=sl_svn2412_492

><td class="source"> * @param {...Object} objs<br></td></tr
><tr
id=sl_svn2412_493

><td class="source"> */<br></td></tr
><tr
id=sl_svn2412_494

><td class="source">_.extend = function(obj, objs) {};<br></td></tr
><tr
id=sl_svn2412_495

><td class="source"><br></td></tr
><tr
id=sl_svn2412_496

><td class="source">/**<br></td></tr
><tr
id=sl_svn2412_497

><td class="source"> * @param {Object} obj<br></td></tr
><tr
id=sl_svn2412_498

><td class="source"> * @param {...Object} defs<br></td></tr
><tr
id=sl_svn2412_499

><td class="source"> */<br></td></tr
><tr
id=sl_svn2412_500

><td class="source">_.defaults = function(obj, defs) {};<br></td></tr
><tr
id=sl_svn2412_501

><td class="source"><br></td></tr
><tr
id=sl_svn2412_502

><td class="source">/**<br></td></tr
><tr
id=sl_svn2412_503

><td class="source"> * @param {Object} obj<br></td></tr
><tr
id=sl_svn2412_504

><td class="source"> * @return {Object}<br></td></tr
><tr
id=sl_svn2412_505

><td class="source"> */<br></td></tr
><tr
id=sl_svn2412_506

><td class="source">_.clone = function(obj) {};<br></td></tr
><tr
id=sl_svn2412_507

><td class="source"><br></td></tr
><tr
id=sl_svn2412_508

><td class="source">/**<br></td></tr
><tr
id=sl_svn2412_509

><td class="source"> * @param {Object} obj<br></td></tr
><tr
id=sl_svn2412_510

><td class="source"> * @param {Function} interceptor<br></td></tr
><tr
id=sl_svn2412_511

><td class="source"> * @return {Object} obj<br></td></tr
><tr
id=sl_svn2412_512

><td class="source"> */<br></td></tr
><tr
id=sl_svn2412_513

><td class="source">_.tap = function(obj, interceptor) {};<br></td></tr
><tr
id=sl_svn2412_514

><td class="source"><br></td></tr
><tr
id=sl_svn2412_515

><td class="source">/**<br></td></tr
><tr
id=sl_svn2412_516

><td class="source"> * @param {Object} a<br></td></tr
><tr
id=sl_svn2412_517

><td class="source"> * @param {Object} b<br></td></tr
><tr
id=sl_svn2412_518

><td class="source"> * @return {boolean}<br></td></tr
><tr
id=sl_svn2412_519

><td class="source"> */<br></td></tr
><tr
id=sl_svn2412_520

><td class="source">_.isEqual = function(a, b) {};<br></td></tr
><tr
id=sl_svn2412_521

><td class="source"><br></td></tr
><tr
id=sl_svn2412_522

><td class="source">/**<br></td></tr
><tr
id=sl_svn2412_523

><td class="source"> * @param {Object|Array|string} obj<br></td></tr
><tr
id=sl_svn2412_524

><td class="source"> * @return {boolean}<br></td></tr
><tr
id=sl_svn2412_525

><td class="source"> */<br></td></tr
><tr
id=sl_svn2412_526

><td class="source">_.isEmpty = function(obj) {};<br></td></tr
><tr
id=sl_svn2412_527

><td class="source"><br></td></tr
><tr
id=sl_svn2412_528

><td class="source">/**<br></td></tr
><tr
id=sl_svn2412_529

><td class="source"> * @param {*} obj<br></td></tr
><tr
id=sl_svn2412_530

><td class="source"> * @return {boolean}<br></td></tr
><tr
id=sl_svn2412_531

><td class="source"> */<br></td></tr
><tr
id=sl_svn2412_532

><td class="source">_.isElement = function(obj) {}<br></td></tr
><tr
id=sl_svn2412_533

><td class="source"><br></td></tr
><tr
id=sl_svn2412_534

><td class="source">/**<br></td></tr
><tr
id=sl_svn2412_535

><td class="source"> * @param {*} obj<br></td></tr
><tr
id=sl_svn2412_536

><td class="source"> * @return {boolean}<br></td></tr
><tr
id=sl_svn2412_537

><td class="source"> */<br></td></tr
><tr
id=sl_svn2412_538

><td class="source">_.isArray = function(obj) {};<br></td></tr
><tr
id=sl_svn2412_539

><td class="source"><br></td></tr
><tr
id=sl_svn2412_540

><td class="source">/**<br></td></tr
><tr
id=sl_svn2412_541

><td class="source"> * @param {*} obj<br></td></tr
><tr
id=sl_svn2412_542

><td class="source"> * @return {boolean}<br></td></tr
><tr
id=sl_svn2412_543

><td class="source"> */<br></td></tr
><tr
id=sl_svn2412_544

><td class="source">_.isObject = function(obj) {};<br></td></tr
><tr
id=sl_svn2412_545

><td class="source"><br></td></tr
><tr
id=sl_svn2412_546

><td class="source">/**<br></td></tr
><tr
id=sl_svn2412_547

><td class="source"> * @param {*} obj<br></td></tr
><tr
id=sl_svn2412_548

><td class="source"> * @return {boolean}<br></td></tr
><tr
id=sl_svn2412_549

><td class="source"> */<br></td></tr
><tr
id=sl_svn2412_550

><td class="source">_.isArguments = function(obj) {};<br></td></tr
><tr
id=sl_svn2412_551

><td class="source"><br></td></tr
><tr
id=sl_svn2412_552

><td class="source">/**<br></td></tr
><tr
id=sl_svn2412_553

><td class="source"> * @param {*} obj<br></td></tr
><tr
id=sl_svn2412_554

><td class="source"> * @return {boolean}<br></td></tr
><tr
id=sl_svn2412_555

><td class="source"> */<br></td></tr
><tr
id=sl_svn2412_556

><td class="source">_.isFunction = function(obj) {};<br></td></tr
><tr
id=sl_svn2412_557

><td class="source"><br></td></tr
><tr
id=sl_svn2412_558

><td class="source">/**<br></td></tr
><tr
id=sl_svn2412_559

><td class="source"> * @param {*} obj<br></td></tr
><tr
id=sl_svn2412_560

><td class="source"> * @return {boolean}<br></td></tr
><tr
id=sl_svn2412_561

><td class="source"> */<br></td></tr
><tr
id=sl_svn2412_562

><td class="source">_.isString = function(obj) {};<br></td></tr
><tr
id=sl_svn2412_563

><td class="source"><br></td></tr
><tr
id=sl_svn2412_564

><td class="source">/**<br></td></tr
><tr
id=sl_svn2412_565

><td class="source"> * @param {*} obj<br></td></tr
><tr
id=sl_svn2412_566

><td class="source"> * @return {boolean}<br></td></tr
><tr
id=sl_svn2412_567

><td class="source"> */<br></td></tr
><tr
id=sl_svn2412_568

><td class="source">_.isNumber = function(obj) {};<br></td></tr
><tr
id=sl_svn2412_569

><td class="source"><br></td></tr
><tr
id=sl_svn2412_570

><td class="source">/**<br></td></tr
><tr
id=sl_svn2412_571

><td class="source"> * @param {*} obj<br></td></tr
><tr
id=sl_svn2412_572

><td class="source"> * @return {boolean}<br></td></tr
><tr
id=sl_svn2412_573

><td class="source"> */<br></td></tr
><tr
id=sl_svn2412_574

><td class="source">_.isNaN = function(obj) {};<br></td></tr
><tr
id=sl_svn2412_575

><td class="source"><br></td></tr
><tr
id=sl_svn2412_576

><td class="source">/**<br></td></tr
><tr
id=sl_svn2412_577

><td class="source"> * @param {*} obj<br></td></tr
><tr
id=sl_svn2412_578

><td class="source"> * @return {boolean}<br></td></tr
><tr
id=sl_svn2412_579

><td class="source"> */<br></td></tr
><tr
id=sl_svn2412_580

><td class="source">_.isBoolean = function(obj) {};<br></td></tr
><tr
id=sl_svn2412_581

><td class="source"><br></td></tr
><tr
id=sl_svn2412_582

><td class="source">/**<br></td></tr
><tr
id=sl_svn2412_583

><td class="source"> * @param {*} obj<br></td></tr
><tr
id=sl_svn2412_584

><td class="source"> * @return {boolean}<br></td></tr
><tr
id=sl_svn2412_585

><td class="source"> */<br></td></tr
><tr
id=sl_svn2412_586

><td class="source">_.isDate = function(obj) {};<br></td></tr
><tr
id=sl_svn2412_587

><td class="source"><br></td></tr
><tr
id=sl_svn2412_588

><td class="source">/**<br></td></tr
><tr
id=sl_svn2412_589

><td class="source"> * @param {*} obj<br></td></tr
><tr
id=sl_svn2412_590

><td class="source"> * @return {boolean}<br></td></tr
><tr
id=sl_svn2412_591

><td class="source"> */<br></td></tr
><tr
id=sl_svn2412_592

><td class="source">_.isRegExp = function(obj) {};<br></td></tr
><tr
id=sl_svn2412_593

><td class="source"><br></td></tr
><tr
id=sl_svn2412_594

><td class="source">/**<br></td></tr
><tr
id=sl_svn2412_595

><td class="source"> * @param {*} obj<br></td></tr
><tr
id=sl_svn2412_596

><td class="source"> * @return {boolean}<br></td></tr
><tr
id=sl_svn2412_597

><td class="source"> */<br></td></tr
><tr
id=sl_svn2412_598

><td class="source">_.isNull = function(obj) {};<br></td></tr
><tr
id=sl_svn2412_599

><td class="source"><br></td></tr
><tr
id=sl_svn2412_600

><td class="source">/**<br></td></tr
><tr
id=sl_svn2412_601

><td class="source"> * @param {*} obj<br></td></tr
><tr
id=sl_svn2412_602

><td class="source"> * @return {boolean}<br></td></tr
><tr
id=sl_svn2412_603

><td class="source"> */<br></td></tr
><tr
id=sl_svn2412_604

><td class="source">_.isUndefined = function(obj) {};<br></td></tr
><tr
id=sl_svn2412_605

><td class="source"><br></td></tr
><tr
id=sl_svn2412_606

><td class="source">/**<br></td></tr
><tr
id=sl_svn2412_607

><td class="source"> * @param {Object} obj<br></td></tr
><tr
id=sl_svn2412_608

><td class="source"> * @param {string} key<br></td></tr
><tr
id=sl_svn2412_609

><td class="source"> * @return {boolean}<br></td></tr
><tr
id=sl_svn2412_610

><td class="source"> */<br></td></tr
><tr
id=sl_svn2412_611

><td class="source">_.has = function(obj, key) {};<br></td></tr
><tr
id=sl_svn2412_612

><td class="source"><br></td></tr
><tr
id=sl_svn2412_613

><td class="source">// Utility functions<br></td></tr
><tr
id=sl_svn2412_614

><td class="source"><br></td></tr
><tr
id=sl_svn2412_615

><td class="source">/**<br></td></tr
><tr
id=sl_svn2412_616

><td class="source"> * @return {_}<br></td></tr
><tr
id=sl_svn2412_617

><td class="source"> */<br></td></tr
><tr
id=sl_svn2412_618

><td class="source">_.noConflict = function() {};<br></td></tr
><tr
id=sl_svn2412_619

><td class="source"><br></td></tr
><tr
id=sl_svn2412_620

><td class="source">/**<br></td></tr
><tr
id=sl_svn2412_621

><td class="source"> * @param {*} value<br></td></tr
><tr
id=sl_svn2412_622

><td class="source"> * @return {*}<br></td></tr
><tr
id=sl_svn2412_623

><td class="source"> */<br></td></tr
><tr
id=sl_svn2412_624

><td class="source">_.identity = function(value) {};<br></td></tr
><tr
id=sl_svn2412_625

><td class="source"><br></td></tr
><tr
id=sl_svn2412_626

><td class="source">/**<br></td></tr
><tr
id=sl_svn2412_627

><td class="source"> * @param {number} n<br></td></tr
><tr
id=sl_svn2412_628

><td class="source"> * @param {Function} iterator<br></td></tr
><tr
id=sl_svn2412_629

><td class="source"> * @param {Object=} opt_context<br></td></tr
><tr
id=sl_svn2412_630

><td class="source"> */<br></td></tr
><tr
id=sl_svn2412_631

><td class="source">_.times = function (n, iterator, opt_context) {};<br></td></tr
><tr
id=sl_svn2412_632

><td class="source"><br></td></tr
><tr
id=sl_svn2412_633

><td class="source">/**<br></td></tr
><tr
id=sl_svn2412_634

><td class="source"> * @param {string} s<br></td></tr
><tr
id=sl_svn2412_635

><td class="source"> * @return {string}<br></td></tr
><tr
id=sl_svn2412_636

><td class="source"> */<br></td></tr
><tr
id=sl_svn2412_637

><td class="source">_.escape = function(s) {};<br></td></tr
><tr
id=sl_svn2412_638

><td class="source"><br></td></tr
><tr
id=sl_svn2412_639

><td class="source">/**<br></td></tr
><tr
id=sl_svn2412_640

><td class="source"> * @param {Object} obj<br></td></tr
><tr
id=sl_svn2412_641

><td class="source"> */<br></td></tr
><tr
id=sl_svn2412_642

><td class="source">_.mixin = function(obj) {};<br></td></tr
><tr
id=sl_svn2412_643

><td class="source"><br></td></tr
><tr
id=sl_svn2412_644

><td class="source">/**<br></td></tr
><tr
id=sl_svn2412_645

><td class="source"> * @param {string=} opt_prefix<br></td></tr
><tr
id=sl_svn2412_646

><td class="source"> * @return {number|string}<br></td></tr
><tr
id=sl_svn2412_647

><td class="source"> */<br></td></tr
><tr
id=sl_svn2412_648

><td class="source">_.uniqueId = function(opt_prefix) {};<br></td></tr
><tr
id=sl_svn2412_649

><td class="source"><br></td></tr
><tr
id=sl_svn2412_650

><td class="source">/**<br></td></tr
><tr
id=sl_svn2412_651

><td class="source"> * @param {string} str<br></td></tr
><tr
id=sl_svn2412_652

><td class="source"> * @param {Object=} opt_data<br></td></tr
><tr
id=sl_svn2412_653

><td class="source"> */<br></td></tr
><tr
id=sl_svn2412_654

><td class="source">_.template = function(str, opt_data) {};<br></td></tr
></table></pre>
<pre><table width="100%"><tr class="cursor_stop cursor_hidden"><td></td></tr></table></pre>
</td>
</tr></table>

 
<script type="text/javascript">
 var lineNumUnderMouse = -1;
 
 function gutterOver(num) {
 gutterOut();
 var newTR = document.getElementById('gr_svn2412_' + num);
 if (newTR) {
 newTR.className = 'undermouse';
 }
 lineNumUnderMouse = num;
 }
 function gutterOut() {
 if (lineNumUnderMouse != -1) {
 var oldTR = document.getElementById(
 'gr_svn2412_' + lineNumUnderMouse);
 if (oldTR) {
 oldTR.className = '';
 }
 lineNumUnderMouse = -1;
 }
 }
 var numsGenState = {table_base_id: 'nums_table_'};
 var srcGenState = {table_base_id: 'src_table_'};
 var alignerRunning = false;
 var startOver = false;
 function setLineNumberHeights() {
 if (alignerRunning) {
 startOver = true;
 return;
 }
 numsGenState.chunk_id = 0;
 numsGenState.table = document.getElementById('nums_table_0');
 numsGenState.row_num = 0;
 if (!numsGenState.table) {
 return; // Silently exit if no file is present.
 }
 srcGenState.chunk_id = 0;
 srcGenState.table = document.getElementById('src_table_0');
 srcGenState.row_num = 0;
 alignerRunning = true;
 continueToSetLineNumberHeights();
 }
 function rowGenerator(genState) {
 if (genState.row_num < genState.table.rows.length) {
 var currentRow = genState.table.rows[genState.row_num];
 genState.row_num++;
 return currentRow;
 }
 var newTable = document.getElementById(
 genState.table_base_id + (genState.chunk_id + 1));
 if (newTable) {
 genState.chunk_id++;
 genState.row_num = 0;
 genState.table = newTable;
 return genState.table.rows[0];
 }
 return null;
 }
 var MAX_ROWS_PER_PASS = 1000;
 function continueToSetLineNumberHeights() {
 var rowsInThisPass = 0;
 var numRow = 1;
 var srcRow = 1;
 while (numRow && srcRow && rowsInThisPass < MAX_ROWS_PER_PASS) {
 numRow = rowGenerator(numsGenState);
 srcRow = rowGenerator(srcGenState);
 rowsInThisPass++;
 if (numRow && srcRow) {
 if (numRow.offsetHeight != srcRow.offsetHeight) {
 numRow.firstChild.style.height = srcRow.offsetHeight + 'px';
 }
 }
 }
 if (rowsInThisPass >= MAX_ROWS_PER_PASS) {
 setTimeout(continueToSetLineNumberHeights, 10);
 } else {
 alignerRunning = false;
 if (startOver) {
 startOver = false;
 setTimeout(setLineNumberHeights, 500);
 }
 }
 }
 function initLineNumberHeights() {
 // Do 2 complete passes, because there can be races
 // between this code and prettify.
 startOver = true;
 setTimeout(setLineNumberHeights, 250);
 window.onresize = setLineNumberHeights;
 }
 initLineNumberHeights();
</script>

 
 
 <div id="log">
 <div style="text-align:right">
 <a class="ifCollapse" href="#" onclick="_toggleMeta(this); return false">Show details</a>
 <a class="ifExpand" href="#" onclick="_toggleMeta(this); return false">Hide details</a>
 </div>
 <div class="ifExpand">
 
 
 <div class="pmeta_bubble_bg" style="border:1px solid white">
 <div class="round4"></div>
 <div class="round2"></div>
 <div class="round1"></div>
 <div class="box-inner">
 <div id="changelog">
 <p>Change log</p>
 <div>
 <a href="/p/closure-compiler/source/detail?spec=svn2412&amp;r=1866">r1866</a>
 by dnad...@google.com
 on Apr 3, 2012
 &nbsp; <a href="/p/closure-compiler/source/diff?spec=svn2412&r=1866&amp;format=side&amp;path=/trunk/contrib/externs/underscore-1.3.1.js&amp;old_path=/trunk/contrib/externs/underscore-1.3.1.js&amp;old=">Diff</a>
 </div>
 <pre>
Add underscore 1.3.1 JS Compiler externs
file

R=nicksantos
DELTA=654  (654 added, 0 deleted, 0
changed)


Revision created by MOE tool
push_codebase.
MOE_MIGRATION=4473
</pre>
 </div>
 
 
 
 
 
 
 <script type="text/javascript">
 var detail_url = '/p/closure-compiler/source/detail?r=1866&spec=svn2412';
 var publish_url = '/p/closure-compiler/source/detail?r=1866&spec=svn2412#publish';
 // describe the paths of this revision in javascript.
 var changed_paths = [];
 var changed_urls = [];
 
 changed_paths.push('/trunk/contrib/externs/underscore-1.3.1.js');
 changed_urls.push('/p/closure-compiler/source/browse/trunk/contrib/externs/underscore-1.3.1.js?r\x3d1866\x26spec\x3dsvn2412');
 
 var selected_path = '/trunk/contrib/externs/underscore-1.3.1.js';
 
 
 function getCurrentPageIndex() {
 for (var i = 0; i < changed_paths.length; i++) {
 if (selected_path == changed_paths[i]) {
 return i;
 }
 }
 }
 function getNextPage() {
 var i = getCurrentPageIndex();
 if (i < changed_paths.length - 1) {
 return changed_urls[i + 1];
 }
 return null;
 }
 function getPreviousPage() {
 var i = getCurrentPageIndex();
 if (i > 0) {
 return changed_urls[i - 1];
 }
 return null;
 }
 function gotoNextPage() {
 var page = getNextPage();
 if (!page) {
 page = detail_url;
 }
 window.location = page;
 }
 function gotoPreviousPage() {
 var page = getPreviousPage();
 if (!page) {
 page = detail_url;
 }
 window.location = page;
 }
 function gotoDetailPage() {
 window.location = detail_url;
 }
 function gotoPublishPage() {
 window.location = publish_url;
 }
</script>

 
 <style type="text/css">
 #review_nav {
 border-top: 3px solid white;
 padding-top: 6px;
 margin-top: 1em;
 }
 #review_nav td {
 vertical-align: middle;
 }
 #review_nav select {
 margin: .5em 0;
 }
 </style>
 <div id="review_nav">
 <table><tr><td>Go to:&nbsp;</td><td>
 <select name="files_in_rev" onchange="window.location=this.value">
 
 <option value="/p/closure-compiler/source/browse/trunk/contrib/externs/underscore-1.3.1.js?r=1866&amp;spec=svn2412"
 selected="selected"
 >...trib/externs/underscore-1.3.1.js</option>
 
 </select>
 </td></tr></table>
 
 
 



 
 </div>
 
 
 </div>
 <div class="round1"></div>
 <div class="round2"></div>
 <div class="round4"></div>
 </div>
 <div class="pmeta_bubble_bg" style="border:1px solid white">
 <div class="round4"></div>
 <div class="round2"></div>
 <div class="round1"></div>
 <div class="box-inner">
 <div id="older_bubble">
 <p>Older revisions</p>
 
 <a href="/p/closure-compiler/source/list?path=/trunk/contrib/externs/underscore-1.3.1.js&start=1866">All revisions of this file</a>
 </div>
 </div>
 <div class="round1"></div>
 <div class="round2"></div>
 <div class="round4"></div>
 </div>
 
 <div class="pmeta_bubble_bg" style="border:1px solid white">
 <div class="round4"></div>
 <div class="round2"></div>
 <div class="round1"></div>
 <div class="box-inner">
 <div id="fileinfo_bubble">
 <p>File info</p>
 
 <div>Size: 11736 bytes,
 654 lines</div>
 
 <div><a href="//closure-compiler.googlecode.com/svn/trunk/contrib/externs/underscore-1.3.1.js">View raw file</a></div>
 </div>
 
 <div id="props">
 <p>File properties</p>
 <dl>
 
 <dt>svn:mime-type</dt>
 <dd>text/javascript</dd>
 
 </dl>
 </div>
 
 </div>
 <div class="round1"></div>
 <div class="round2"></div>
 <div class="round4"></div>
 </div>
 </div>
 </div>


</div>

</div>
</div>

<script src="http://www.gstatic.com/codesite/ph/16229512607128645344/js/prettify/prettify.js"></script>
<script type="text/javascript">prettyPrint();</script>


<script src="http://www.gstatic.com/codesite/ph/16229512607128645344/js/source_file_scripts.js"></script>

 <script type="text/javascript" src="http://www.gstatic.com/codesite/ph/16229512607128645344/js/kibbles.js"></script>
 <script type="text/javascript">
 var lastStop = null;
 var initialized = false;
 
 function updateCursor(next, prev) {
 if (prev && prev.element) {
 prev.element.className = 'cursor_stop cursor_hidden';
 }
 if (next && next.element) {
 next.element.className = 'cursor_stop cursor';
 lastStop = next.index;
 }
 }
 
 function pubRevealed(data) {
 updateCursorForCell(data.cellId, 'cursor_stop cursor_hidden');
 if (initialized) {
 reloadCursors();
 }
 }
 
 function draftRevealed(data) {
 updateCursorForCell(data.cellId, 'cursor_stop cursor_hidden');
 if (initialized) {
 reloadCursors();
 }
 }
 
 function draftDestroyed(data) {
 updateCursorForCell(data.cellId, 'nocursor');
 if (initialized) {
 reloadCursors();
 }
 }
 function reloadCursors() {
 kibbles.skipper.reset();
 loadCursors();
 if (lastStop != null) {
 kibbles.skipper.setCurrentStop(lastStop);
 }
 }
 // possibly the simplest way to insert any newly added comments
 // is to update the class of the corresponding cursor row,
 // then refresh the entire list of rows.
 function updateCursorForCell(cellId, className) {
 var cell = document.getElementById(cellId);
 // we have to go two rows back to find the cursor location
 var row = getPreviousElement(cell.parentNode);
 row.className = className;
 }
 // returns the previous element, ignores text nodes.
 function getPreviousElement(e) {
 var element = e.previousSibling;
 if (element.nodeType == 3) {
 element = element.previousSibling;
 }
 if (element && element.tagName) {
 return element;
 }
 }
 function loadCursors() {
 // register our elements with skipper
 var elements = CR_getElements('*', 'cursor_stop');
 var len = elements.length;
 for (var i = 0; i < len; i++) {
 var element = elements[i]; 
 element.className = 'cursor_stop cursor_hidden';
 kibbles.skipper.append(element);
 }
 }
 function toggleComments() {
 CR_toggleCommentDisplay();
 reloadCursors();
 }
 function keysOnLoadHandler() {
 // setup skipper
 kibbles.skipper.addStopListener(
 kibbles.skipper.LISTENER_TYPE.PRE, updateCursor);
 // Set the 'offset' option to return the middle of the client area
 // an option can be a static value, or a callback
 kibbles.skipper.setOption('padding_top', 50);
 // Set the 'offset' option to return the middle of the client area
 // an option can be a static value, or a callback
 kibbles.skipper.setOption('padding_bottom', 100);
 // Register our keys
 kibbles.skipper.addFwdKey("n");
 kibbles.skipper.addRevKey("p");
 kibbles.keys.addKeyPressListener(
 'u', function() { window.location = detail_url; });
 kibbles.keys.addKeyPressListener(
 'r', function() { window.location = detail_url + '#publish'; });
 
 kibbles.keys.addKeyPressListener('j', gotoNextPage);
 kibbles.keys.addKeyPressListener('k', gotoPreviousPage);
 
 
 }
 </script>
<script src="http://www.gstatic.com/codesite/ph/16229512607128645344/js/code_review_scripts.js"></script>
<script type="text/javascript">
 function showPublishInstructions() {
 var element = document.getElementById('review_instr');
 if (element) {
 element.className = 'opened';
 }
 }
 var codereviews;
 function revsOnLoadHandler() {
 // register our source container with the commenting code
 var paths = {'svn2412': '/trunk/contrib/externs/underscore-1.3.1.js'}
 codereviews = CR_controller.setup(
 {"assetVersionPath":"http://www.gstatic.com/codesite/ph/16229512607128645344","projectHomeUrl":"/p/closure-compiler","relativeBaseUrl":"","loggedInUserEmail":"Arno.Tanielian@gmail.com","profileUrl":"/u/109120733937413081764/","token":"s8HhoKW_q6SiaFe6bO1ayZcJt-Q:1355987032015","projectName":"closure-compiler","assetHostPath":"http://www.gstatic.com/codesite/ph","domainName":null}, '', 'svn2412', paths,
 CR_BrowseIntegrationFactory);
 
 codereviews.registerActivityListener(CR_ActivityType.REVEAL_DRAFT_PLATE, showPublishInstructions);
 
 codereviews.registerActivityListener(CR_ActivityType.REVEAL_PUB_PLATE, pubRevealed);
 codereviews.registerActivityListener(CR_ActivityType.REVEAL_DRAFT_PLATE, draftRevealed);
 codereviews.registerActivityListener(CR_ActivityType.DISCARD_DRAFT_COMMENT, draftDestroyed);
 
 
 
 
 
 
 
 var initialized = true;
 reloadCursors();
 }
 window.onload = function() {keysOnLoadHandler(); revsOnLoadHandler();};

</script>
<script type="text/javascript" src="http://www.gstatic.com/codesite/ph/16229512607128645344/js/dit_scripts.js"></script>

 
 
 
 <script type="text/javascript" src="http://www.gstatic.com/codesite/ph/16229512607128645344/js/ph_core.js"></script>
 
 
 
 
</div> 

<div id="footer" dir="ltr">
 <div class="text">
 <a href="/projecthosting/terms.html">Terms</a> -
 <a href="http://www.google.com/privacy.html">Privacy</a> -
 <a href="/p/support/">Project Hosting Help</a>
 </div>
</div>
 <div class="hostedBy" style="margin-top: -20px;">
 <span style="vertical-align: top;">Powered by <a href="http://code.google.com/projecthosting/">Google Project Hosting</a></span>
 </div>

 
 


 
 </body>
</html>

