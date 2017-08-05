#!/bin/sh

cd /u01/app/grid/cfgtoollogs/asmca/scripts
su grid -c "/u01/app/12.1.0.2/grid/bin/srvctl add asm -proxy"
if [ "$?" != "0" ]; then
	echo "Error adding ASM Proxy"
	exit 1
fi
/u01/app/12.1.0.2/grid/srvm/admin/srvmhelper -updateDepASM
if [ "$?" != "0" ]; then
	echo "Error updating ASM resource dependencies"
	exit 1
fi
for node in odie1 odie2
do
	/u01/app/12.1.0.2/grid/bin/crsctl stop cluster -n $node
	if [ "$?" != "0" ]; then
		echo "Error stopping Oracle Grid Infrastructure in node $node"
		exit 1
	fi
	/u01/app/12.1.0.2/grid/bin/crsctl start cluster -n $node

	stat=1
	cmd="/u01/app/12.1.0.2/grid/bin/crsctl status server $node"
	while [ $stat = 1 ]
	do
		sleep 5
		op=`$cmd`
		op=`echo $op | /bin/cut -d' ' -f2  | /bin/cut -d'=' -f2`
		if [ "$op" = "ONLINE" ]
		then
			stat=0
			echo "Oracle Grid Infrastructure restarted in node $node"
		fi
	done
	if [ "$node" = odie1 ]; then
		for lsnr in ASMNET1LSNR_ASM ASMNET2LSNR_ASM
		do
			/u01/app/12.1.0.2/grid/bin/srvctl start listener -listener $lsnr
			lsnrret=$?
			if [ "$lsnrret" = "2" ]; then
				echo "ASM listener $lsnr running already"
			elif [ "$lsnrret" != "0" ]; then
				echo "Error starting ASM listener $lsnr"
				exit 1
			fi
		done
	fi
done

