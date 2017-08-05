<?xml version="1.0" encoding="utf-8"?>
<xsl:stylesheet version="1.0"  xmlns="http://www.w3.org/1999/xhtml" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
<xsl:output method="xml" version="1.0" encoding="utf-8" omit-xml-declaration="yes" standalone="yes" doctype-public="-//W3C//DTD XHTML 1.1//EN" doctype-system="http://www.w3.org/TR/xhtml11/DTD/xhtml11.dtd" indent="no" media-type="text/xml" />

<!-- elitversion =  1408 -->

<xsl:template match="message">
    <div class="message">
        <div class="boxheader" id="{generate-id()}">
            <p class="msgnumber"># <xsl:value-of select="@id + 1"/></p>
            <p>
                <xsl:variable name="currentposition" select="position()"/>
                <xsl:apply-templates select="messageid"/>
                <xsl:apply-templates select="inreplyto"/>
                <xsl:if test="position() &gt; 1">
                    <a href="#{generate-id(../message[$currentposition - 1])}" title="To previous message">previous</a>
                    <xsl:text> | </xsl:text>
                </xsl:if>
                <xsl:if test="position() != last()">
                    <a href="#{generate-id(../message[$currentposition + 1])}" title="To next message">next</a>
                    <xsl:text> | </xsl:text>
                </xsl:if>
                <a href="#idx{generate-id()}" title="To message index">index</a>
                <xsl:text> | </xsl:text>
                <a href="#logoheader">top</a>
            </p>
        </div>

        <div class="info">
            <div class="msgdate">
                <p><xsl:apply-templates select="received"/></p>
                <p title="mbox"><xsl:value-of select="@mbox"/></p>
            </div>
            <div class="msgsubject">
                <h2>
                    <xsl:if test="string-length(subject) = 0">
                        <i>no subject</i>
                    </xsl:if>
                    <xsl:value-of select="subject"/>
                </h2>
            </div>
            <div class="msgaddresses">
                From <xsl:apply-templates select="from"/> to <xsl:apply-templates select="to"/>
            </div>
            <xsl:if test="count(cc) != 0">
                <div class="msgaddresses">
                    Cc: <xsl:apply-templates select="cc"/>
                </div>
            </xsl:if>
            <xsl:if test="count(bcc) != 0">
                <div class="msgaddresses">
                    Bcc: <xsl:apply-templates select="bcc"/>
                </div>
            </xsl:if>
        </div>

        <xsl:if test="count(attachment) &gt; 0">
            <div class="attachments">
                <table class="wide">
                    <xsl:apply-templates select="attachment" mode="detail"/>
                </table>
            </div>
        </xsl:if>

        <div class="messagetext">
            <pre><xsl:apply-templates select="text"/></pre>
        </div>

        <xsl:apply-templates select="rawheader"/>
    </div>
</xsl:template>

<xsl:template match="rawheader">
    <div class="rawheader">
        <div class="messageheader">Raw Header</div>
        <div class="messagetext">
            <pre><xsl:value-of select="."/></pre>
        </div>
    </div>
</xsl:template>

<xsl:template match="messageid">
    <xsl:variable name="mid" select="."/>
    <xsl:variable name="fid" select="generate-id(/m2x/message[inreplyto = $mid])"/>

    <xsl:if test="$fid != ''">
        <a href="#{$fid}" title="To reply">
            <b>has reply</b>
        </a>
        <xsl:text> | </xsl:text>
    </xsl:if>
</xsl:template>

<xsl:template match="inreplyto">
    <xsl:variable name="fid" select="."/>
    <xsl:variable name="mid" select="generate-id(/m2x/message[messageid = $fid])"/>

    <xsl:if test="$mid != ''">
        <a href="#{$mid}" title="To origin">
            <b>is reply to</b>
        </a>
        <xsl:text> | </xsl:text>
    </xsl:if>
</xsl:template>

<xsl:template match="attachment" mode="detail">
    <tr>
        <xsl:attribute name="class">
            <xsl:if test="(position() mod 2) = 1">
                <xsl:text>even</xsl:text>
            </xsl:if>
        </xsl:attribute>
        <td class="iconcol"><xsl:apply-templates select="." mode="icon" /></td>
        <td>
            <xsl:apply-templates select="error" />
            <a href="{concat('attachments/' ,dir ,'/' , name)}">
                <xsl:value-of select="name"/>
            </a>
        </td>
        <td><xsl:value-of select="size"/></td>
        <td class="last"><xsl:value-of select="type"/></td>
    </tr>
</xsl:template>

<xsl:template match="error">
    <p class="error"><xsl:value-of select="."/></p>
</xsl:template>

<xsl:template match="received">
    <xsl:value-of select="concat(substring(date,1,4),'-',substring(date,5,2),'-',substring(date,7,2))"/>, <xsl:value-of select="time"/>
</xsl:template>

<xsl:template match="from">
    <xsl:param name="truncate" select="0"/>
    <xsl:call-template name="mailadress">
        <xsl:with-param name="truncate" select="$truncate"/>
    </xsl:call-template>
</xsl:template>

<xsl:template match="to">
    <xsl:param name="truncate" select="0"/>
    <xsl:call-template name="mailadress">
        <xsl:with-param name="truncate" select="$truncate"/>
    </xsl:call-template>
    <xsl:if test="position() != last()">
        <xsl:text>, </xsl:text>
    </xsl:if>
</xsl:template>

<xsl:template match="cc">
    <xsl:call-template name="mailadress"/>
    <xsl:if test="position() != last()">
        <xsl:text>, </xsl:text>
    </xsl:if>
</xsl:template>

<xsl:template match="bcc">
    <xsl:call-template name="mailadress"/>
    <xsl:if test="position() != last()">
        <xsl:text>, </xsl:text>
    </xsl:if>
</xsl:template>

<xsl:template name="mailadress">
    <xsl:param name="truncate" select="0"/>
    <a href="{concat('mailto: ', email)}" title="{email}">
        <xsl:choose>
            <xsl:when test="string-length(name) = 0">
                <b>???</b>
            </xsl:when>
            <xsl:when test="string-length(name) &gt; 22 and $truncate = 1">
                <xsl:value-of select="concat(substring(name,1,19), '...')"/>
            </xsl:when>
            <xsl:otherwise>
                <xsl:value-of select="name"/>
            </xsl:otherwise>
        </xsl:choose>
    </a>
</xsl:template>


<xsl:template match="text">
    <pre><xsl:value-of select="."/></pre>
</xsl:template>

<xsl:template name="sumattachmentsize">
    <xsl:param name="units" select="0"/>
    <xsl:param name="size" select="0"/>

    <xsl:choose>
        <xsl:when test="$size > 1024">
            <xsl:call-template name="sumattachmentsize">
                <xsl:with-param name="units" select="$units + 1"/>
                <xsl:with-param name="size" select="$size div 1024"/>
            </xsl:call-template>
        </xsl:when>
        <xsl:otherwise>
            <xsl:value-of select="format-number($size,'.00')"/>
            <xsl:choose>
                <xsl:when test="$units =  0">
                    <xsl:text> b</xsl:text>
                </xsl:when>
                <xsl:when test="$units =  1">
                    <xsl:text> kB</xsl:text>
                </xsl:when>
                <xsl:when test="$units =  2">
                    <xsl:text> MB</xsl:text>
                </xsl:when>
                <xsl:when test="$units =  3">
                    <xsl:text> GB</xsl:text>
                </xsl:when>
                <xsl:when test="$units =  4">
                    <xsl:text> TB</xsl:text>
                </xsl:when>
                <xsl:when test="$units =  5">
                    <xsl:text> PB</xsl:text>
                </xsl:when>
            </xsl:choose>
        </xsl:otherwise>
    </xsl:choose>
</xsl:template>


<xsl:template name="messageindex">
    <div style="border-top: 1px solid #cccccc; border-bottom: 1px solid #cccccc">
        <table class="wide" id="messageindextable">
            <thead>
                <tr>
                    <th title="Number" class="intcol">#</th>
                    <th title="Email Subject">Subject</th>
                    <th title="To related message" class="center">R</th>
                    <th title="Has attachment(s)" class="center">A</th>
                    <th title="Source Mbox file">Mbox</th>
                    <th title="From">From</th>
                    <th title="To">To</th>
                    <th title="Date and time" class="last">Date</th>
                </tr>
            </thead>
            <tbody id="message_index_table">
                <xsl:for-each select="/m2x/message">
                    <tr id="idx{generate-id()}">
                        <xsl:attribute name="class">
                            <xsl:if test="(position() mod 2) = 0">
                                <xsl:text>even</xsl:text>
                            </xsl:if>
                        </xsl:attribute>
                        <td class="intcol"><xsl:value-of select="@id + 1" /></td>
                        <td>
                            <a href="{concat('#',generate-id())}" >
                                <xsl:choose>
                                    <xsl:when test="string-length(subject) &gt; 0">
                                        <xsl:value-of select="subject"/>
                                    </xsl:when>
                                    <xsl:otherwise>
                                        <b>no subject</b>
                                    </xsl:otherwise>
                                </xsl:choose>
                            </a>
                        </td>
                        <td>
                            <xsl:variable name="mid" select="messageid"/>
                            <xsl:variable name="fid" select="inreplyto"/>

                            <xsl:choose>
                                <xsl:when test="count(/m2x/message[inreplyto = $mid]) &gt; 0">
                                    <a title="To reply message" href="#idx{generate-id(/m2x/message[inreplyto = $mid][1])}">▼</a>
                                </xsl:when>
                                <xsl:otherwise>   </xsl:otherwise>
                            </xsl:choose>

                            <xsl:choose>
                                <xsl:when test="count(/m2x/message[messageid = $fid]) &gt; 0">
                                    <a title="To source message" href="#idx{generate-id(/m2x/message[messageid = $fid][1])}">▲</a>
                                </xsl:when>
                                <xsl:otherwise>   </xsl:otherwise>
                            </xsl:choose>
                        </td>
                        <td>
                            <xsl:apply-templates select="attachment[last()]" mode="icon" />
                        </td>
                        <td class="mboxname">
                            <xsl:variable name="mbox" select="@mbox"/>
                            <xsl:attribute name="title">
                                <xsl:value-of select="/m2x/mboxes/name[@id = $mbox]"/>
                            </xsl:attribute>
                            <xsl:value-of select="$mbox"/>
                        </td>
                        <td class="addresscolumn">
                          <xsl:apply-templates select="from">
                              <xsl:with-param name="truncate" select="1"/>
                          </xsl:apply-templates>
                        </td>
                        <td class="addresscolumn">
                            <xsl:choose>
                            <xsl:when test="count(to) &gt; 1">
                                <div style="" class="foldbox">
                                <div class="fold button">► multiple</div>
                                    <xsl:for-each select="to">
                                        <xsl:apply-templates select=".">
                                          <xsl:with-param name="truncate" select="1"/>
                                        </xsl:apply-templates>
                                        <xsl:if test="position() != last()">
                                            <br/>
                                        </xsl:if>
                                    </xsl:for-each>
                                </div>
                            </xsl:when>
                            <xsl:otherwise>
                                <xsl:apply-templates select="to">
                                  <xsl:with-param name="truncate" select="1"/>
                                </xsl:apply-templates>
                            </xsl:otherwise>
                            </xsl:choose>
                        </td>
                        <td class="datecolumn last"><xsl:value-of select="concat(substring(received/date,1,4),'-',substring(received/date,5,2),'-',substring(received/date,7,2),' ',substring(received/time,1,5))"/></td>
                    </tr>
                </xsl:for-each>
            </tbody>
        </table>
    </div>
</xsl:template>

<xsl:template match="attachment" mode="icon">
    <xsl:variable name="tooltip" select="concat(name,' - ', type)" />
    <xsl:choose>
        <xsl:when test="type = 'image/jpeg' or type = 'image/gif' or type = 'image/bmp' or type = 'image/png' or type = 'image/jpg'">
            <img alt="{type}" title="{$tooltip}" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAgNJREFUeNqkk09rE0EYxp9Juoa1UhoKxabRFkFFK9STbaVQ8VREpCp+Bb168OinyEkFDz148FDQi5ciGDxUoa0ttKgHlQiJRhI06W5258/O+s6uG1KbBcGBYWZnZ37zvM+8LwvDEP/TBpLJ83Il1FpDBQE0dRUoKKUgqSspcWbSxsLMNEsFBHToxuUTfW958PRNNJbfbod/Q7oAc5tpm5vb8DwJpS0EmhFYo+N16I/dF9IDkNHouBy+5wGtNYTtXQhtQ+ImyusVtPf2oj2XZs8XyLvaPoCUMUDqHNj3EuzGE3Af0LQ85L2GOnob15eWUFp+0d8DIUU8+hzjucMYLFwAskfQqH8Gr32Adh/h7Km7YBmWBogVKN7BsXwB+eI5Atg4/u0jVpsP4fk/SGUAzvk+QCaZcBErkMqEQ3O/BbhNWJaFwdxQtM5F0N13UIGIyVxlUZXDGP35HghtaKcOr12DYy3SYdXddwCQSLOYwMv6aTR1BvPFBjbaI1hxJjAxOkthqHQFCaDa0nhcGcHiyYvITg3j1Y6LZ+4uJj/VcYtLCi/VA06Jo1GuHqIvRu7/wtYXF1vvviI/0IGDHHxuQlApCgggZYjle3OR28I4Tv3qtSL4lbE/LxCQmakhCNy5X4oSSpLl5iVMdppiMmsm1U2BmZrpbay3nBljhX8t4ySVfwswAMJTNJOLbk5xAAAAAElFTkSuQmCC" />
        </xsl:when>
        <xsl:when test="type = 'application/pdf'">
            <img alt="{type}" title="{$tooltip}" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAZlJREFUeNqkUz1LA0EQnQvBkCqFiJBKLcSgYsBCG1FsAnKVTTpT2lhpmx8QmxTBwlIbwVKMgShoAhYKNtaxCaI/wBDM7eyHMxfuvNzlQHBhmNm9nTfz3u1Yxhj4z0p6wVW7a7TWIJUCTSaVBCklIJlEhNxMGjbXVqxYAEVJu9tzY6ucXj65vv38asIgFlOoFwpjedjNpuurZ/ewmpv0z4Mgfgd2KLkeiJEotF+68NXrufut9XyWCn+OAISXCMQ7G/N+XDtvjNegHgKYCMTLC7NDnbQBKxHSkTVgO7l4NOGly+WhJ0OpzPcAzd5RlfXKenl+B44QERqm1eIK9Dv592oQqCP3Ej5n4UQA3jodegcKBJkj2GTk3m8HzuiH93weUrYNH0uLkEynoZ/JQKpUinQQAWBe/UoFBsUiTB8cgoPUAVmKq5PHh+MYAGpN0VNWkjRqNGDq5g4GjvQBuH3kmHwsAKJxOeP1LQgv2aFkPuPqpAPKWAoC9ss199UhcjVB6qM7THzGg8UDxjMTmQV/Y1nZv46x95R/BBgAXiAmw5V/0VkAAAAASUVORK5CYII=" />
        </xsl:when>
        <xsl:when test="type = 'application/msword'">
            <img alt="{type}" title="{$tooltip}" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAm5JREFUeNqkU0FrE0EU/nazJE1Si1pbbQKaVgxVrNZemqpgJQcPXvRkxIPH/gAPXnIVwWNFsYIeVIoHe9CD3oSg1USLUA9qqxJT0oq7SWiSxmR2Znd8u22hWyoIDjz2MTvvm+99bz5FSon/Wdp68jRTkLZtQ1gWbAphCQghwCkE5zgYC+LU8FFlM4Ayfv+17Orqgq7rkPTbiWq9jkqlAsUHlMoGTiYSLoCzNoNoofYwzpyNQ9pxGBUgHAZaJhAKAbUGHSCOz6Ze0tFVgExuVm4E0Sq1Kt5kDSwsFPFlfg6pVAqvpqcxevoEJibuYmjoGDi1kJkpoEbMnDWaGIyQdktOru6JRBEIt6OwWASjvn0B4G0uCx/drJcMF3TyyWOcTw7g8rnjqFaXPRqoHz7O4vCRIALBNjfezczi09c5fJ7Lw4bEhYsplCplDPT34lA8BkX16qhV68tQKcm9z+I3a0GqEkZZx83bt1Aq6Yj3aujo2E5ToQkJG4wxLwN/wIfSCim/UkU02oORkWGoqori0iLS6TQaJGideufcAjOdML0M9F8/QdNC2dARDLWhb/9e7Nq5g8CiSCbjLjuTipxik0BM08tA04jyNhrZi+cPUC5biPUAk4/uobMTYE2gUFjBvlgfWi0BxrdgYJkNDA6M4kC8H36/H41mC/PfvkNV/OiJRtDdvRv5/A80GXcZcL6JwdSda66sV64/lDeuXoIlJDgJxl26lnurU9hkYm1PbO0FRr1xTsXCWj3I14oZfdf2OAFyYf4FgJkYS4+7r45z5zaTxsZdMzl7jrEcg1lkNI+ZNtpZUZTIv9p4/Sn/EWAAaV5XxTm0KQUAAAAASUVORK5CYII=" />
        </xsl:when>
        <xsl:when test="type = 'application/msaccess'">
            <img alt="{type}" title="{$tooltip}" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAjlJREFUeNqkU0toFEEQfRP24gdiVNDEIAbFzyGoB1G8JJCjICrmoB5EAhoR8eAhRDx4EEVQIfGmHhRPKoKfkxdxBdGFxA/sZZHNJprVBJeNk9n59FT3jNW9H7KjAcGGZqqLea9fva6y4jjG/6xUPXiWnoqjKIJUChFvqSSklCDekgjbNixBz+7tVpLA+nTlfhwKgggE/IoHz+XteHCdauxXfLQOnzUEeiVJUsTgXZcGGgnvRxnunG3iZW2tWNq+EjfvveJTlSCd+RwvJEkFftAAz38p4Oe7LLJvPiKTzWHficPYub8HxCWkx6Yw7zjmv949OzrYu+86bvFd3ySVCFEazyEmYPPadpw8dxTvbz/FdC6P/MhdHOzrxvEDe2Hbv5pN9CpVAvdrEetXrMaENwm7VEZm5AO+zcxWjZopo3trF1QUw2pp9jHlVlwTBHaAcmkWT649hr0qRnZsEmcuDKBzy0b4xC+h+IVkBCFEQgG7PTdRxPTrcby88wJv8wX0HzqCoUe30Na5xvzkh8Q+KITEBGGYLMFDpVA04E39vRgcHG0A60tIxUBNwDtMKNAmLu9ah+Hcw0W7LeTGCgIJQepPBY7t4EbfaVOj4K7TtwX8DUgDqmdTBveLVkCUUHC58NzYev7qg/j60DEoGYOYzNTMsgVVpftC1nLy77MguDYiBktVM6wGFsqo0DliQpLhIgTcSKcujpquI9K3hfxsZIZJ5/Rg6QFTSjUP08Jxtiyr41/HuN7KvwUYAME3dvkrbDyqAAAAAElFTkSuQmCC" />
        </xsl:when>
        <xsl:when test="type = 'text/html' or type = 'text/plain'">
            <img alt="{type}" title="{$tooltip}" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAXtJREFUeNqkUz1LA0EQnQ02VkpimlRiIVhpp40olpaKIIhohJjLf/BXBPRsLS1t7NMp2PgT0oh31xmI7rczo3ckuVsQXFh2btl57827GeG9h/+suTx4GAy9cw6MteBwG2vAGAMat9Ea1pbnYWdzXQQBLCYd7K1UstzeP/E5eH71syC1PCC20Bp/jouYQCoVGKP5jON4KrnX64HGEgYvQ/gYjfhud2ujhd69TQHQozxhdu1vrxZx/+6x2gOlVaGg2WxClmX8PRlfdiMQNRECCCvwbLJDlRaklNUAUqmSB8Sepik0GkuQJCmctTvFu7ICJUsKnPPcF9oQu8NkU7wrK/iVlisg1ndktdhc1nqwCHJ80g4ryAGiKOIEbewPK9ataCP7l9R4F/RAMtvNdQx1rjnB3qASHCws1iFBLw6PThkoCKC1h/OLDrtNrMwu8WQ19AfIj2AJCrpXfW4orXGIsC+oO2mY6I5anQaMZmZyiclxFkK0/jrGeSt/CzAAlu4TZ92NFhEAAAAASUVORK5CYII=" />
        </xsl:when>
        <xsl:when test="contains(name, '.rar') or contains(name, '.zip') or contains(name, '.gz') or contains(name, '.7z')">
            <img alt="{type}" title="{$tooltip}" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAYdJREFUeNqkU71KA0EQng1pfACbNDEg/mIUQSJCUEEQbBIL8RFshLyAb6CN6Sx9gRAbsbBJGRASa6sU2tkYSG53Zvec2XhJzN2B4MCwy+zMd998N6PCMIT/WDa6PLR6oXMOyFpw7GQJiAiQnRBhdWEO9kubahYgE10sF50eFuDsaBHOj5dhPvsO7ac7+Hx7Hie32q9hKoB8bdaq1ao/B8NBKkh2AoAxgGazCfl8HpBbaL304Kvf9/GD3a0ca/fxC0CSkhh0Oh04KS+NY/X7x2QRDZpUBhsrhZFOLgSVUckamBQGYtI0WccsLWitkwG0SWbg9eFCX2xsLG/CwOgYQKUyYmAoKqZY3oTBDDUZ0Eaj8fNmIQgIhuypDCIAGW0iB91uB65vbn1sqLlYIwTsiKkaaFZZhHKgud+19SLUapf+LfAA5E9jKPk3CgBiyLM/EmynVIbi9h4Ypi/FEkPWAcmkAGgDF1d1P1CIUmD8dMoySUxGXRZMdmba1PQ6K6Vyf13jaJS/BRgAKqAMuFdUBmkAAAAASUVORK5CYII=" />
        </xsl:when>
        <xsl:when test="contains(name, '.wav')">
            <img alt="{type}" title="{$tooltip}" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAZZJREFUeNqkUztLA0EQngshxkdtEZtrFEwTG9FCURC11N7CRkhlZyNYWfgD0qilnQiKWohFBFP5wMIIdgoGJKRSuGiSvX2cM8tdzjN7Ijgw7IPZ7/tmdsbyPA/+Y1YAcFKqeEopEFKCQhdSgBACOLrgHIbtbpgay1kdCARAfnjx7MXZ9v6Vd3l9rz2IDzwRABFbnDWajfa+dFOO5JwMAXgsAMcUSncVcOp1fZ4eH8kgezUCQEE/7WB1E15uH8BeWoDs3IS+K+ydRWLaKbjcNbLnFmehdlqEwYF+yA7ZYCWidUyGAOYU5tfzQEl/vjvQm+oCxpgZgLlmBVTpmbUV/FaFMbIjLlTgMsNjrI2Q6AprpFCl7IgLFXyTVj4uQvXxCd5ea5pVPyZ2/ouCAKDpfMD51o7fKAAtJn1moVfOmfkXGEqT1MrIlurrAYWv7clRBBDam/5KQDFFZIiOlOk0LB/tajaS3GoJYFQHYqd0RGwKLuQ3CrqhOMchwr6g7qRhojtqdRowiYNmnEZ9sKzMX8c4aOUvAQYAF4hAYO8LluMAAAAASUVORK5CYII=" />
        </xsl:when>
        <xsl:otherwise>
            <img alt="{type}" title="{$tooltip}" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAUBJREFUeNqkU71OAzEMdioWXqETZUAwINjogkCMjLwEL8FTdGJlZGRhvw0kFh6hCw9ApaL4J8FOL9fSO0uVsBTFF+X7ic8OOWf4T+zV5KWZ55QSsAgkXSwMzAyki4ng5GAfri7OgksgCrq7ORxUeXx+K3vz/pm3SUY1MTUvlj/LLjeSQQfM5BKQPqH5mMP3YlG+r6fnY63d1x8Cu+TF7eVRl8+eXodrgIQuwenxZFWnlCGMgkfgO8ilyPqHOEGMcZgg4rAD6xMDshIgpd69tQOMPXBSy9YXpARERiC9e2sHW9ZEsgJltQyMAlEJXAeVwCx3YLNsqkWZy07k1iBqlRMIK1jMsnSqWJS5PWOfgKgqtyDbo+7tGaE9yX0Cwv3DrDQUkalh6U4bJjuzVrcBs5nZjLA5ziGE8a5jXFv5V4ABAPHnGc24jGwzAAAAAElFTkSuQmCC" />
        </xsl:otherwise>
    </xsl:choose>
</xsl:template>

<!-- +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+      HEADER      +-+-+-+-+-+-+-+-+-+-+-+-+-+-+ -->

<xsl:template name="pageheader">
    <div id="pageheader">
        <img id="headerbackground" src="data:image/png;base64,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"/>
        <div id="logoheader">
            <a href="http://tools.elit.nl/mbox2xml.php">
                <img id="logo" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJMAAAAyCAYAAABYpeleAAAACXBIWXMAAAsTAAALEwEAmpwYAAAKT2lDQ1BQaG90b3Nob3AgSUNDIHByb2ZpbGUAAHjanVNnVFPpFj333vRCS4iAlEtvUhUIIFJCi4AUkSYqIQkQSoghodkVUcERRUUEG8igiAOOjoCMFVEsDIoK2AfkIaKOg6OIisr74Xuja9a89+bN/rXXPues852zzwfACAyWSDNRNYAMqUIeEeCDx8TG4eQuQIEKJHAAEAizZCFz/SMBAPh+PDwrIsAHvgABeNMLCADATZvAMByH/w/qQplcAYCEAcB0kThLCIAUAEB6jkKmAEBGAYCdmCZTAKAEAGDLY2LjAFAtAGAnf+bTAICd+Jl7AQBblCEVAaCRACATZYhEAGg7AKzPVopFAFgwABRmS8Q5ANgtADBJV2ZIALC3AMDOEAuyAAgMADBRiIUpAAR7AGDIIyN4AISZABRG8lc88SuuEOcqAAB4mbI8uSQ5RYFbCC1xB1dXLh4ozkkXKxQ2YQJhmkAuwnmZGTKBNA/g88wAAKCRFRHgg/P9eM4Ors7ONo62Dl8t6r8G/yJiYuP+5c+rcEAAAOF0ftH+LC+zGoA7BoBt/qIl7gRoXgugdfeLZrIPQLUAoOnaV/Nw+H48PEWhkLnZ2eXk5NhKxEJbYcpXff5nwl/AV/1s+X48/Pf14L7iJIEyXYFHBPjgwsz0TKUcz5IJhGLc5o9H/LcL//wd0yLESWK5WCoU41EScY5EmozzMqUiiUKSKcUl0v9k4t8s+wM+3zUAsGo+AXuRLahdYwP2SycQWHTA4vcAAPK7b8HUKAgDgGiD4c93/+8//UegJQCAZkmScQAAXkQkLlTKsz/HCAAARKCBKrBBG/TBGCzABhzBBdzBC/xgNoRCJMTCQhBCCmSAHHJgKayCQiiGzbAdKmAv1EAdNMBRaIaTcA4uwlW4Dj1wD/phCJ7BKLyBCQRByAgTYSHaiAFiilgjjggXmYX4IcFIBBKLJCDJiBRRIkuRNUgxUopUIFVIHfI9cgI5h1xGupE7yAAygvyGvEcxlIGyUT3UDLVDuag3GoRGogvQZHQxmo8WoJvQcrQaPYw2oefQq2gP2o8+Q8cwwOgYBzPEbDAuxsNCsTgsCZNjy7EirAyrxhqwVqwDu4n1Y8+xdwQSgUXACTYEd0IgYR5BSFhMWE7YSKggHCQ0EdoJNwkDhFHCJyKTqEu0JroR+cQYYjIxh1hILCPWEo8TLxB7iEPENyQSiUMyJ7mQAkmxpFTSEtJG0m5SI+ksqZs0SBojk8naZGuyBzmULCAryIXkneTD5DPkG+Qh8lsKnWJAcaT4U+IoUspqShnlEOU05QZlmDJBVaOaUt2ooVQRNY9aQq2htlKvUYeoEzR1mjnNgxZJS6WtopXTGmgXaPdpr+h0uhHdlR5Ol9BX0svpR+iX6AP0dwwNhhWDx4hnKBmbGAcYZxl3GK+YTKYZ04sZx1QwNzHrmOeZD5lvVVgqtip8FZHKCpVKlSaVGyovVKmqpqreqgtV81XLVI+pXlN9rkZVM1PjqQnUlqtVqp1Q61MbU2epO6iHqmeob1Q/pH5Z/YkGWcNMw09DpFGgsV/jvMYgC2MZs3gsIWsNq4Z1gTXEJrHN2Xx2KruY/R27iz2qqaE5QzNKM1ezUvOUZj8H45hx+Jx0TgnnKKeX836K3hTvKeIpG6Y0TLkxZVxrqpaXllirSKtRq0frvTau7aedpr1Fu1n7gQ5Bx0onXCdHZ4/OBZ3nU9lT3acKpxZNPTr1ri6qa6UbobtEd79up+6Ynr5egJ5Mb6feeb3n+hx9L/1U/W36p/VHDFgGswwkBtsMzhg8xTVxbzwdL8fb8VFDXcNAQ6VhlWGX4YSRudE8o9VGjUYPjGnGXOMk423GbcajJgYmISZLTepN7ppSTbmmKaY7TDtMx83MzaLN1pk1mz0x1zLnm+eb15vft2BaeFostqi2uGVJsuRaplnutrxuhVo5WaVYVVpds0atna0l1rutu6cRp7lOk06rntZnw7Dxtsm2qbcZsOXYBtuutm22fWFnYhdnt8Wuw+6TvZN9un2N/T0HDYfZDqsdWh1+c7RyFDpWOt6azpzuP33F9JbpL2dYzxDP2DPjthPLKcRpnVOb00dnF2e5c4PziIuJS4LLLpc+Lpsbxt3IveRKdPVxXeF60vWdm7Obwu2o26/uNu5p7ofcn8w0nymeWTNz0MPIQ+BR5dE/C5+VMGvfrH5PQ0+BZ7XnIy9jL5FXrdewt6V3qvdh7xc+9j5yn+M+4zw33jLeWV/MN8C3yLfLT8Nvnl+F30N/I/9k/3r/0QCngCUBZwOJgUGBWwL7+Hp8Ib+OPzrbZfay2e1BjKC5QRVBj4KtguXBrSFoyOyQrSH355jOkc5pDoVQfujW0Adh5mGLw34MJ4WHhVeGP45wiFga0TGXNXfR3ENz30T6RJZE3ptnMU85ry1KNSo+qi5qPNo3ujS6P8YuZlnM1VidWElsSxw5LiquNm5svt/87fOH4p3iC+N7F5gvyF1weaHOwvSFpxapLhIsOpZATIhOOJTwQRAqqBaMJfITdyWOCnnCHcJnIi/RNtGI2ENcKh5O8kgqTXqS7JG8NXkkxTOlLOW5hCepkLxMDUzdmzqeFpp2IG0yPTq9MYOSkZBxQqohTZO2Z+pn5mZ2y6xlhbL+xW6Lty8elQfJa7OQrAVZLQq2QqboVFoo1yoHsmdlV2a/zYnKOZarnivN7cyzytuQN5zvn//tEsIS4ZK2pYZLVy0dWOa9rGo5sjxxedsK4xUFK4ZWBqw8uIq2Km3VT6vtV5eufr0mek1rgV7ByoLBtQFr6wtVCuWFfevc1+1dT1gvWd+1YfqGnRs+FYmKrhTbF5cVf9go3HjlG4dvyr+Z3JS0qavEuWTPZtJm6ebeLZ5bDpaql+aXDm4N2dq0Dd9WtO319kXbL5fNKNu7g7ZDuaO/PLi8ZafJzs07P1SkVPRU+lQ27tLdtWHX+G7R7ht7vPY07NXbW7z3/T7JvttVAVVN1WbVZftJ+7P3P66Jqun4lvttXa1ObXHtxwPSA/0HIw6217nU1R3SPVRSj9Yr60cOxx++/p3vdy0NNg1VjZzG4iNwRHnk6fcJ3/ceDTradox7rOEH0x92HWcdL2pCmvKaRptTmvtbYlu6T8w+0dbq3nr8R9sfD5w0PFl5SvNUyWna6YLTk2fyz4ydlZ19fi753GDborZ752PO32oPb++6EHTh0kX/i+c7vDvOXPK4dPKy2+UTV7hXmq86X23qdOo8/pPTT8e7nLuarrlca7nuer21e2b36RueN87d9L158Rb/1tWeOT3dvfN6b/fF9/XfFt1+cif9zsu72Xcn7q28T7xf9EDtQdlD3YfVP1v+3Njv3H9qwHeg89HcR/cGhYPP/pH1jw9DBY+Zj8uGDYbrnjg+OTniP3L96fynQ89kzyaeF/6i/suuFxYvfvjV69fO0ZjRoZfyl5O/bXyl/erA6xmv28bCxh6+yXgzMV70VvvtwXfcdx3vo98PT+R8IH8o/2j5sfVT0Kf7kxmTk/8EA5jz/GMzLdsAAAAgY0hSTQAAeiUAAICDAAD5/wAAgOkAAHUwAADqYAAAOpgAABdvkl/FRgAABENJREFUeNrsXT1v1EAQfU7uyGFRUcAvoEQiPf+CX8APTEsq0hApQhEtiRSUREpEFEJJuFNOyVDch33rXe+MvXceo5nGznq9NvK7N2/erk328+aGRqMRAACEUlB1L3Dc34cE7XVjUbRt//AMHz+8z2DRaWyNxxNMJhOlQIq37R+e4dOXM3uSCmIAAOO/Y9ze/ioeFJF3v/y3r09s67a57XXn+/ruHd3j7u7OnqIWZkIALKmAFDo/dJ3YOItzT66nwfu06ApMCYHkCw44OMxU3p5cT/H96qECSgsFaY5AKlOb79wykIyZlDETIZzmpECKMZM0tcWAZMykkJn6ILZ9QDJW0qiZSL/YrgOSAUpNNRcXzVrEtg9oBiSFArwPYpvDdhZKBLh2sW1A6okA5wLp9PQU4/G46Lc4tpgqIc9YpT5FU6mPM8b0xVtc3j6wxbmFIgHuPuA65sjzHMXEcHogPQ5fgQRVnoWmNMcAkpvK8jwHiDIAGWG+JWQA5vuzNrdP+diyjzPG085r7zU5pqqFhjQnLP+JCO92d5OK7cX+twuqtNWNbQylyhqQiW2JIJYCyXc+d2wLRdZAV8629xoexuGwnYVia2DdznYQSDAg9baa802nxFJbDGBShouBlzumRZdpjnigCYneNmLbO65jIUT7G5CU+UygjTnbcdA2S5sWCphJMp1Sx04phLmEwYydtDIT8cV2bKmKRGyHj8mXulhoqOZIJra5zCRJValWKlgo8JkQ0EIpnW3uMQTm8Dj3Z9F1mmOU+ZVffzKxLWMrY6YeMBNBMEPvmIopxPZq6syiWs2YSatmgmyuzVf9pQBSjJGMmXpSzYEQTSmuF5QqffnBI9dlFhrSnMdtrvd/eNaB9Nhqu1Vz/fWZIFvqIZ1O4fpRsZRmQFLOTOW5ML5ITsdIVZBmyfSVxaYFOIHFSKl8pDphLXHXDUhqBTitZRmJxOBcOYexAtOApFKAU6MH/+P3Tsm8LKqwZb9S6UcUqNJWT57t0h+WDRADVJZl60aa+9lDanBOk6A13Vs6AS4B0uPg5eIGZ9bTfHndsm2+Lc3aFsfmbVRpn43xfDT0vuokAZJFhwKcW7YTER7yN4vaPQkjuX1GO0PRmiYDlKY0V0IA72sk963XLzXSUQagPmgm3i8/9jWSphVhSoGfQPf8r8H5d1LbMQaxt1OkH5GQu90pgGRMpSbNhaYvmn6NRPI2SxsgFT+oxmAiY7SUAjwgdtfBSG39qZAnZcykI7ZQ8XrSAslLB6mA1J6ZLNIK8OoD0iy2vWnOBLg+n0m72PanuSdjJm0+Ux/EdjDN0cYFeFNWow1dp1ufae/ons0ynYltX5ozAa6LmQ6Oz3F1eR4FhvuyZnlNeOWzg7Wgc4CEGnajytTfStv28Bm2B0N7khrAdHB8js9fLxjMUa3IUgIpUPbBmQ8u/o+6+bHH6aRNmrNIGP8GAB7cGZCnrsBdAAAAAElFTkSuQmCC"/>
            </a>
            <h1>mbox2xml<span class="subtitle"> email backup </span><span id="stretch" title="Widen view">◄►</span></h1>
        </div>

        <xsl:choose>
            <xsl:when test="count(/m2x/page) = 0">
                <h2><xsl:value-of select="/m2x/name"/></h2>
            </xsl:when>
            <xsl:otherwise>
                <h2 id="nav">
                    <xsl:if test="/m2x/page > 1">
                        <a title="To page {/m2x/page - 1}" href="messages_{format-number(/m2x/page - 1, '0000')}.xml">previous</a><xsl:text> ::</xsl:text>
                    </xsl:if>
                    <a title="To page index" href="index.xml">index</a>
                    <xsl:if test="/m2x/page/@islast != 1">
                        <xsl:text> :: </xsl:text><a title="To page {/m2x/page + 1}" href="messages_{format-number(/m2x/page + 1, '0000')}.xml">next</a>
                    </xsl:if>
                </h2>
                <h2>
                    <xsl:value-of select="/m2x/name"/>
                    <xsl:text> page </xsl:text>
                    <xsl:value-of select="/m2x/page"/>
                </h2>
            </xsl:otherwise>
        </xsl:choose>

        <div id="">
            <xsl:choose>
                <xsl:when test="count(/m2x/page) = 0">
                    <h4><xsl:call-template name="idxsubheader"/></h4>
                </xsl:when>
                <xsl:otherwise>
                    <h4><xsl:call-template name="msgsubheader"/></h4>
                </xsl:otherwise>
            </xsl:choose>
            <h5><xsl:call-template name="metaheader"/></h5>
        </div>
    </div>
</xsl:template>

<xsl:template name="msgsubheader">
    <xsl:value-of select="count(/m2x/message)"/>
    <xsl:text> Messages and </xsl:text>
    <xsl:value-of select="count(/m2x/message/attachment)"/>
    <xsl:text> attachments with a total size  of </xsl:text>
    <xsl:call-template name="sumattachmentsize">
        <xsl:with-param name="size" select="sum(//attachment/bytes)"/>
    </xsl:call-template>
    <xsl:text> received between </xsl:text>
    <xsl:value-of select="concat(substring(/m2x/firstdate,1,4),'-',substring(/m2x/firstdate,5,2),'-',substring(/m2x/firstdate,7,2))"/>
    <xsl:text> and </xsl:text>
    <xsl:value-of select="concat(substring(/m2x/lastdate,1,4),'-',substring(/m2x/lastdate,5,2),'-',substring(/m2x/lastdate,7,2))"/>
    <xsl:text>. </xsl:text>
</xsl:template>

<xsl:template name="metaheader">
    <xsl:text>Export created on </xsl:text>
    <xsl:value-of select="concat(substring(/m2x/created/date,1,4),'-',substring(/m2x/created/date,5,2),'-',substring(/m2x/created/date,7,2))"/>
    <xsl:text> at </xsl:text>
    <xsl:value-of select="/m2x/created/time"/>
    <xsl:text> with Mbox2xml version </xsl:text>
    <xsl:value-of select="/m2x/created/version"/>
    <xsl:text> from mbox file</xsl:text>
    <xsl:if test="count(/m2x/mboxes/name) > 1">s</xsl:if>
    <xsl:text> </xsl:text>
    <xsl:for-each select="/m2x/mboxes/name">
        <xsl:sort select="." data-type="text" order="ascending" />
        <xsl:value-of select="."/>
        <xsl:if test="position() &lt; (last() - 1)">
            <xsl:text>, </xsl:text>
        </xsl:if>
        <xsl:if test="position() = (last() - 1)">
            <xsl:text> and </xsl:text>
        </xsl:if>
    </xsl:for-each>
    <xsl:text>.</xsl:text>
</xsl:template>

<xsl:template name="idxsubheader">
    <xsl:value-of select="sum(/m2x/m2xpage/messagecount)"/>
    <xsl:text> Messages on </xsl:text>
    <xsl:value-of select="count(/m2x/m2xpage)"/> page<xsl:if test="count(/m2x/m2xpage) > 1">s</xsl:if>
    <xsl:text>, received between </xsl:text>
    <xsl:value-of select="concat(substring(/m2x/m2xpage[position()=1]/firstdate,1,4),'-',substring(/m2x/m2xpage[position()=1]/firstdate,5,2),'-',substring(/m2x/m2xpage[position()=1]/firstdate,7,2))"/>
    <xsl:text> and </xsl:text>
    <xsl:value-of select="concat(substring(/m2x/m2xpage[last()]/lastdate,1,4),'-',substring(/m2x/m2xpage[last()]/lastdate,5,2),'-',substring(/m2x/m2xpage[last()]/lastdate,7,2))"/>
    <xsl:text> containing </xsl:text>
    <xsl:value-of select="sum(/m2x/m2xpage/attachments)"/>
    <xsl:text> attchament with a total size of </xsl:text>
    <xsl:call-template name="sumattachmentsize">
        <xsl:with-param name="size" select="sum(/m2x/m2xpage/attbytes)"/>
    </xsl:call-template>
    <xsl:text>.</xsl:text>
</xsl:template>

<!-- +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+      END HEADER      +-+-+-+-+-+-+-+-+-+-+-+-+-+-+ -->

<!-- +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+      PAGES INDEX      +-+-+-+-+-+-+-+-+-+-+-+-+-+-+ -->

<xsl:template name="pagesindex">
    <table class="wide">
        <thead>
            <tr>
                <th class="intcol">#</th>
                <th class="intcol">messages</th>
                <th>start date</th>
                <th>end date</th>
                <th class="intcol">attachments</th>
                <th class="floatcol">size</th>
                <th>mboxes</th>
            </tr>
        </thead>
        <tbody id="page_index_table">
        <xsl:apply-templates select="/m2x/m2xpage">
            <xsl:sort select="number" data-type="number" order="ascending" />
        </xsl:apply-templates>
        </tbody>
    </table>
</xsl:template>

<xsl:template match="m2xpage">
    <tr>
        <xsl:attribute name="class">
            <xsl:if test="(position() mod 2) = 1">
                <xsl:text>even</xsl:text>
            </xsl:if>
        </xsl:attribute>
        <xsl:apply-templates select="number"/>
        <xsl:apply-templates select="messagecount"/>
        <xsl:apply-templates select="firstdate"/>
        <xsl:apply-templates select="lastdate"/>
        <xsl:apply-templates select="attachments"/>
        <xsl:apply-templates select="attbytes"/>
        <xsl:apply-templates select="mboxes"/>
    </tr>
</xsl:template>

<xsl:template match="number">
    <td class="intcol"><a href="{../filename}"><xsl:value-of select="."/></a></td>
</xsl:template>

<xsl:template match="messagecount|attachments">
    <td class="intcol"><xsl:value-of select="."/></td>
</xsl:template>

<xsl:template match="filename">
    <td><a href="{.}"><xsl:value-of select="."/></a></td>
</xsl:template>

<xsl:template match="firstdate|lastdate">
    <td class="datecol"><xsl:value-of select="concat(substring(.,1,4),'-',substring(.,5,2),'-',substring(.,7,2))"/></td>
</xsl:template>

<xsl:template match="attbytes">
    <td class="floatcol">
        <xsl:call-template name="sumattachmentsize">
            <xsl:with-param name="size" select="."/>
        </xsl:call-template>
    </td>
</xsl:template>

<xsl:template match="mboxes">
    <td class="mboxes">
        <xsl:for-each select="name">
            <xsl:sort select="." data-type="text" order="ascending" />
            <xsl:value-of select="."/>
            <xsl:if test="position() != last()">, </xsl:if>
        </xsl:for-each>
   </td>
</xsl:template>

<!-- +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+      END PAGES INDEX      +-+-+-+-+-+-+-+-+-+-+-+-+-+-+ -->

<!-- +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+      MAIN TEMPLATE      +-+-+-+-+-+-+-+-+-+-+-+-+-+-+ -->

<xsl:template name="main" match="/">
    <html xmlns="http://www.w3.org/1999/xhtml">
      <head>
            <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
            <meta content="Copyright © ELIT 2005-2009 www.elit.nl" name="author"/>

            <link href="_mbox2xml.css" rel="stylesheet" type="text/css"/>

            <script type="text/javascript" src="_prototype.js"></script>
            <script type="text/javascript" src="_mbox2xml.js"></script>

            <title>
                <xsl:value-of select="/m2x/name"/>
                <xsl:choose>
                    <xsl:when test="count(/m2x/page) = 0"> Index</xsl:when>
                    <xsl:otherwise> Page <xsl:value-of select="/m2x/page"/></xsl:otherwise>
                </xsl:choose>
            </title>
        </head>

        <body>
            <div id="main">
                <xsl:call-template name="pageheader"/>

                <xsl:choose>
                    <xsl:when test="count(/m2x/page) = 0">
                        <div class="filter_holder" style="display: none" id="pages_index_filter">
                        </div>
                        <h2>Page index <span id="activitylabel"></span></h2>
                        <xsl:call-template name="pagesindex"/>
                    </xsl:when>
                    <xsl:otherwise>
                        <div class="filter_holder" style="display: none" id="message_index_filter">
                        </div>
                        <h2>Message index <span id="activitylabel"></span></h2>

                        <xsl:call-template name="messageindex"/>

                        <div class="filter_holder" style="display: none" id="messages_filter">
                        </div>
                        <h2>Messages</h2>

                        <div id="messages">
                            <xsl:apply-templates select="m2x/message" />
                        </div>
                    </xsl:otherwise>
                </xsl:choose>

                <h5 class="footer">copyright © Elit 2005-2009 <a href="http://tools.elit.nl/">http://tools.elit.nl</a></h5>
            </div>
        </body>
    </html>
</xsl:template>

<!-- +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+ END MAIN TEMPLATE +-+-+-+-+-+-+-+-+-+-+-+-+-+-+ -->

</xsl:stylesheet>
