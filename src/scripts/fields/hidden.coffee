Formbuilder.registerField 'hidden',

  order: 37
  type: 'non_input'

  view: """
    <label class='section-name'><%= rf.get(Formbuilder.options.mappings.LABEL) %></label>
    <div class="stub-hidden-field" >
   <img
   src="data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTYuMC4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4PSIwcHgiIHk9IjBweCIgd2lkdGg9IjY0cHgiIGhlaWdodD0iNjRweCIgdmlld0JveD0iMCAwIDIxLjc2NCAyMS43NjMiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDIxLjc2NCAyMS43NjM7IiB4bWw6c3BhY2U9InByZXNlcnZlIj4KPGc+Cgk8Zz4KCQk8cGF0aCBkPSJNMTAuODgyLDAuMDIzQzQuODcyLDAuMDIzLDAsMi40NiwwLDUuNDY0djIuNjljMS44NzItMi4yNDgsNS45ODQtMy43NzgsMTAuODgyLTMuNzc4YzQuODk3LDAsOS4wMSwxLjUzLDEwLjg4MiwzLjc3OCAgICB2LTIuNjlDMjEuNzY0LDIuNDU5LDE2Ljg5MiwwLjAyMywxMC44ODIsMC4wMjN6IiBmaWxsPSIjOTMzRUM1Ii8+CgkJPHBhdGggZD0iTTQuNTY0LDYuNDhDMS44MDQsNy40NjcsMCw5LjA3OSwwLDEwLjkwNGMwLDUuNzA4LDQuMzk2LDEwLjM4MSw5Ljk4NywxMC44MzdDOC41MjUsMjAuMzgsNC44MiwxNS45ODIsNC41NjQsNi40OHoiIGZpbGw9IiM5MzNFQzUiLz4KCQk8cGF0aCBkPSJNMTcuMjE1LDYuNDg2Yy0wLjEwNyw5LjQ4NC0zLjkwNCwxMy44ODUtNS40MTksMTUuMjU0YzUuNTgxLTAuNDY2LDkuOTY4LTUuMTM1LDkuOTY4LTEwLjgzNiAgICBDMjEuNzY0LDkuMDgzLDE5Ljk2Niw3LjQ3NCwxNy4yMTUsNi40ODZ6IiBmaWxsPSIjOTMzRUM1Ii8+CgkJPHBhdGggZD0iTTEwLjg4Miw1Ljk2NGMxLjY0OSwwLDMuMjgyLDAuMTkzLDQuNzUsMC41NjJjLTAuMTEyLDguNDA3LTMuMzEyLDEyLjQ3Ni00LjczOCwxMy44NzMgICAgYy0xLjM4Ni0xLjQwNi00LjQ5Ny01LjQ4MS00Ljc0Ni0xMy44NzdDNy42MTEsNi4xNTUsOS4yMzgsNS45NjQsMTAuODgyLDUuOTY0IE0xMC44ODIsNS40NjRjLTEuOTAxLDAtMy42ODgsMC4yNDUtNS4yNDMsMC42NzQgICAgYzAuMTgsOS42NTEsNC4xMDUsMTMuOTE1LDUuMjQ5LDE0Ljk0OGMxLjE3My0xLjAyMyw1LjIyOC01LjI4Myw1LjI0Ny0xNC45NDVDMTQuNTc2LDUuNzEsMTIuNzg3LDUuNDY0LDEwLjg4Miw1LjQ2NEwxMC44ODIsNS40NjQgICAgeiIgZmlsbD0iIzkzM0VDNSIvPgoJCTxnPgoJCQk8Zz4KCQkJCTxwYXRoIGQ9Ik0xMC44ODIsNy40MjhjLTIuMDAzLDAtMy42MjcsMS42MjQtMy42MjcsMy42MjZjMCwyLjAwNCwxLjYyNCwzLjYyNywzLjYyNywzLjYyN2MyLjAwNCwwLDMuNjI3LTEuNjIzLDMuNjI3LTMuNjI3ICAgICAgQzE0LjUwOSw5LjA1MiwxMi44ODYsNy40MjgsMTAuODgyLDcuNDI4eiBNMTAuODgyLDEzLjk1OGMtMS42MDMsMC0yLjkwMi0xLjMtMi45MDItMi45MDJjMC0xLjYwNCwxLjI5OS0yLjkwMiwyLjkwMi0yLjkwMiAgICAgIGMxLjYwMywwLDIuOTAxLDEuMjk5LDIuOTAxLDIuOTAyQzEzLjc4MywxMi42NTksMTIuNDg0LDEzLjk1OCwxMC44ODIsMTMuOTU4eiIgZmlsbD0iIzkzM0VDNSIvPgoJCQk8L2c+CgkJCTxnPgoJCQkJPGNpcmNsZSBjeD0iMTAuODgyIiBjeT0iMTEuMDU2IiByPSIxLjQ1MSIgZmlsbD0iIzkzM0VDNSIvPgoJCQk8L2c+CgkJPC9nPgoJPC9nPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+Cjwvc3ZnPgo="

    <br/>
    <p style="color:gray"><%= rf.get(Formbuilder.options.mappings.DESCRIPTION) %></p>

   </div>
  """

  edit: """
    <div class='fb-edit-section-header'>Field Name</div>
    <input type='text' data-rv-input='model.<%= Formbuilder.options.mappings.LABEL %>' />
    <input type='text' data-rv-input='model.<%= Formbuilder.options.mappings.DESCRIPTION %>'
      placeholder='Set the Hidden Value'></textarea>
  """

  addButton: """
    <span class="symbol"><span class="fa fa-eye-slash"></span></span> Hidden Field
  """
